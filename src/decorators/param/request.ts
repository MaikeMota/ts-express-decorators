import {EXPRESS_REQUEST} from "../../constants/metadata-keys";
import EndpointParam from "../../controllers/endpoint-param";

/**
 * Request service.
 * @returns {function(Function, (string|symbol), number): void}
 * @constructor
 */
export function Request(): Function {

    return (target: Function, propertyKey: string | symbol, parameterIndex: number): void => {

        if (typeof parameterIndex === "number") {

            EndpointParam.useService(EXPRESS_REQUEST, {
                target,
                propertyKey,
                parameterIndex
            });

        }
    };
}