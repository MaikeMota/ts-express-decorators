/**
 * @module mvc
 */ /** */

import {Type} from "../../../core/interfaces/Type";
import {EndpointParam} from "../../class/EndpointParam";
import {EXPRESS_NEXT_FN} from "../../constants/index";
/**
 *
 * @returns {function(Function, (string|symbol), number): void}
 * @decorator
 */
export function Next(): Function {

    return (target: Type<any>, propertyKey: string | symbol, parameterIndex: number): void => {

        if (typeof parameterIndex === "number") {

            EndpointParam.useService(EXPRESS_NEXT_FN, {
                target,
                propertyKey,
                parameterIndex
            });

        }
    };
}
