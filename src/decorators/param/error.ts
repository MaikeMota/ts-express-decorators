import {EXPRESS_ERR} from "../../constants/metadata-keys";
import EndpointParam from "../../controllers/endpoint-param";

/**
 *
 * @returns {Function}
 * @constructor
 */
export function Err(): Function {

    return (target: Function, propertyKey: string | symbol, parameterIndex: number): void => {

        if (typeof parameterIndex === "number") {

            EndpointParam.useService(EXPRESS_ERR, {
                propertyKey,
                parameterIndex,
                target,
                useConverter: false
            });

        }
    };
}
