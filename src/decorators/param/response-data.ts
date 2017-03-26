import {RESPONSE_DATA} from "../../constants/metadata-keys";
import EndpointParam from "../../controllers/endpoint-param";

/**
 *
 * @returns {function(Function, (string|symbol), number): void}
 * @constructor
 */
export function ResponseData(): Function {

    return (target: Function, propertyKey: string | symbol, parameterIndex: number): void => {

        /* istanbul ignore else */
        if (parameterIndex !== undefined) {

            EndpointParam.useService(RESPONSE_DATA, {
                propertyKey,
                parameterIndex,
                target,
                useConverter: false
            });

        }

    };
}