import {INJECT_PARAMS} from "../constants/metadata-keys";
import Metadata from "../services/metadata";
import {getClassName} from "../utils";
import {IInjectableParamsMetadata, Type} from "../interfaces/interfaces";
/**
 *
 */
export default class EndpointParam implements IInjectableParamsMetadata<any> {
    /**
     *
     */
    public required: boolean;
    /**
     *
     */
    public expression: string | RegExp;
    /**
     *
     */
    public useType: Type<any>;
    /**
     *
     * @type {boolean}
     */
    public useConverter: boolean = true;
    /**
     *
     */
    public baseType: Type<any>;
    /**
     *
     */
    private _service: string | Type<any> | symbol;
    /**
     *
     */
    private _name: string;

    /**
     *
     * @returns {symbol}
     */
    get service(): Type<any> | symbol {
        return <any>this._service;
    }

    /**
     *
     * @param value
     */
    set service(value: Type<any> | symbol) {

        this._service = value;
        this._name = typeof value === "function" ? getClassName(this._service) : this._service.toString().replace("Symbol(", "").replace(")", "");
    }

    /**
     *
     * @returns {string}
     */
    get name(): string {
        return this._name;
    }

    /**
     *
     * @returns {{service: (string|symbol), name: string, expression: string, required: boolean, use: undefined, baseType: undefined}}
     */
    toJSON() {

        const use = this.useType ? getClassName(this.useType) : undefined;
        const baseType = this.baseType && use !== getClassName(this.baseType) ? getClassName(this.baseType) : undefined;

        return {
            service: typeof this._service === "function" ? getClassName(this._service) : this._service,
            name: this._name,
            expression: this.expression,
            required: this.required,
            use,
            baseType: baseType
        };
    }

    isService() {

    }

    /**
     *
     * @param target
     * @param targetKey
     * @param index
     * @returns {any}
     */
    static get(target: any, targetKey: string | symbol, index: number): EndpointParam {

        const params = this.getParams(target, targetKey);

        params[index] = params[index] || new EndpointParam();

        return params[index];

    }

    /**
     *
     * @param target
     * @param targetKey
     * @returns {Array}
     */
    static getParams(target: any, targetKey: string | symbol): EndpointParam[] {

        return Metadata.has(INJECT_PARAMS, target, targetKey)
            ? Metadata.get(INJECT_PARAMS, target, targetKey)
            : [];
    }

    /**
     *
     * @param target
     * @param targetKey
     * @param index
     * @param injectParams
     */
    static set(target: any, targetKey: string | symbol, index: number, injectParams: EndpointParam): void {

        const params = Metadata.has(INJECT_PARAMS, target, targetKey)
            ? Metadata.get(INJECT_PARAMS, target, targetKey)
            : [];

        params[index] = injectParams;

        Metadata.set(INJECT_PARAMS, params, target, targetKey);
    }

    /**
     *
     * @param target
     * @param method
     */
    static isInjectable = (target, method): boolean =>
        (Metadata.get(INJECT_PARAMS, target, method) || []).length > 0;


    /**
     *
     * @param filterKey
     * @param options
     */
    static useFilter(filterKey: Type<any>, options: any) {
        EndpointParam.builder(filterKey, options);
        return this;
    }

    /**
     *
     * @param service
     * @param settings
     */
    static useService(service: symbol, settings: any) {
        const injectParams = EndpointParam.get(settings.target, settings.propertyKey, settings.parameterIndex);
        injectParams.service = service;
        EndpointParam.set(settings.target, settings.propertyKey, settings.parameterIndex, injectParams);
        return this;
    }

    /**
     *
     * @param target
     * @param propertyKey
     * @param parameterIndex
     */
    static required(target, propertyKey, parameterIndex) {
        const injectParams = EndpointParam.get(target, propertyKey, parameterIndex);

        injectParams.required = true;

        EndpointParam.set(target, propertyKey, parameterIndex, injectParams);
        return this;
    }

    /**
     *
     * @param service
     * @param options
     */
    static builder(service: Type<any>, options: any): EndpointParam {
        let {
            propertyKey,
            parameterIndex,
            expression,
            target,
            useType,
            useConverter
        } = options;

        const injectParams = EndpointParam.get(target, propertyKey, parameterIndex);
        const baseType = Metadata.getParamTypes(target, propertyKey)[parameterIndex];

        if (typeof expression !== "string") {
            useType = <any>expression;
            expression = undefined;
        }

        injectParams.service = service;
        injectParams.expression = expression;
        injectParams.baseType = baseType;
        injectParams.useType = useType || baseType;

        if (useConverter !== undefined) {
            injectParams.useConverter = useConverter;
        }

        EndpointParam.set(target, propertyKey, parameterIndex, injectParams);

        return injectParams;
    }


}