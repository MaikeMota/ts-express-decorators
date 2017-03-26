import {EXPRESS_NEXT_FN} from "../../constants/metadata-keys";
import EndpointParam from "../../controllers/endpoint-param";

/**
 *
 * @returns {function(Function, (string|symbol), number): void}
 * @constructor
 */
export function Next(): Function {

    return (target: Function, propertyKey: string | symbol, parameterIndex: number): void => {

        if (typeof parameterIndex === "number") {

            EndpointParam.useService(EXPRESS_NEXT_FN, {
                target,
                propertyKey,
                parameterIndex
            });

        }
    };
}
