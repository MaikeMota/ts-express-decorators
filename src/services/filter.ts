import {Service} from "../decorators/class/service";
import InjectorService from "./injector";
import {EnvTypes, ServerSettingsService} from "./server-settings";
import {$log} from "ts-log-debug";
import {getClassOrSymbol} from "../utils";
import {Type, IFilter, IFilterProvider} from "../interfaces";

@Service()
export default class FilterService {

    private static filters: Map<Type<any>, IFilterProvider<any>> = new Map<Type<any>, IFilterProvider<any>>();

    constructor(
        private injectorService: InjectorService,
        private serverSettings: ServerSettingsService
    ) {

    }

    /**
     *
     */
    $afterServicesInit() {

        if (this.serverSettings.env !== EnvTypes.TEST) {
            $log.info("[TSED] Import middlewares");
        }

        FilterService.filters.forEach((settings, target) => {
            settings.instance = this.injectorService.invoke(target);
            FilterService.filters.set(target, settings);
        });
    }

    /**
     *
     * @param callbackfn
     * @param thisArg
     */
    forEach = (callbackfn: (value: any, index: any, map: Map<any, any>) => void, thisArg?: any): void =>
         FilterService.filters.forEach(callbackfn);

    /**
     *
     * @param key
     * @returns {null}
     */
    get = <T extends IFilter>(key: Type<T>): IFilterProvider<T> =>
        FilterService.get<T>(key);

    /**
     *
     * @param key
     * @returns {null}
     */
    has = (key: Type<any>): boolean =>
        FilterService.has(key);

    /**
     *
     * @param key
     * @param value
     * @returns {null}
     */
    set = (key: Type<any>, value?: any): this => {
        FilterService.set(key, value);
        return this;
    }

    /**
     *
     * @param target
     * @returns {T}
     */
    invoke<T extends IFilter>(target: Type<T>): T {
        return this.get<T>(target).instance;
    }

    /**
     *
     * @param target
     * @param expression
     * @param request
     * @param response
     * @returns {any}
     */
    invokeMethod<T extends IFilter>(target: Type<T>, expression, request, response) {
        return this.invoke<T>(target).transform(expression, request, response);
    }
    /**
     *
     * @param key
     * @returns {null}
     */
    static get<T extends IFilter>(key: Type<T>): IFilterProvider<T> {
        return this.filters.get(key);
    }

    /**
     *
     * @param key
     * @returns {null}
     */
    static has(key: any): boolean {
        return null;
    }

    /**
     *
     * @returns {null}
     * @param provider
     * @param instance
     */
    static set(provider: IFilterProvider<any> | any, instance?: any): any {

        let target;

        if (provider["provide"] === undefined) {

            target = provider;

            provider = <IFilterProvider<any>>{
                provide: target,
                useClass: target,
                instance: instance || target,
                type: "filter"
            };

        } else {
            target = provider.provide;
        }

        provider = Object.assign(
            FilterService.filters.get(getClassOrSymbol(target)) || {},
            provider
        );

        FilterService.filters.set(getClassOrSymbol(target), provider);

        return FilterService;
    }

    get size() {
        return FilterService.filters.size;
    }
}