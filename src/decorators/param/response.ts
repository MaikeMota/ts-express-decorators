
import {EXPRESS_RESPONSE} from "../../constants/metadata-keys";
import EndpointParam from "../../controllers/endpoint-param";

/**
 * Response service.
 * @returns {function(Function, (string|symbol), number): void}
 * @constructor
 */
export function Response(): Function {

    return (target: Function, propertyKey: string | symbol, parameterIndex: number): void => {

        if (typeof parameterIndex === "number") {

            EndpointParam.useService(EXPRESS_RESPONSE, {
                target,
                propertyKey,
                parameterIndex
            });

        }
    };
}