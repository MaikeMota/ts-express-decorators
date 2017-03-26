import {ENDPOINT_INFO} from "../../constants/metadata-keys";
import EndpointParam from "../../controllers/endpoint-param";
/**
 *
 * @returns {Function}
 * @constructor
 */
export function EndpointInfo(): Function {

    return (target: Function, propertyKey: string | symbol, parameterIndex: number): void => {

        if (typeof parameterIndex === "number") {

            EndpointParam.useService(ENDPOINT_INFO, {
                propertyKey,
                parameterIndex,
                target,
                useConverter: false
            });

        }

    };
}