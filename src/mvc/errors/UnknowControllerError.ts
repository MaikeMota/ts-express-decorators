/**
 * @module mvc
 */ /** */

import {InternalServerError} from "ts-httpexceptions";
import {Type} from "../../core/interfaces/Type";
import {getClassName} from "../../core/utils/index";
/**
 * @private
 */
export class UnknowControllerError extends InternalServerError {

    name: "UNKNOW_CONTROLLER_ERROR";

    constructor(target: Type<any> | string) {
        super(UnknowControllerError.buildMessage(target));
    }

    /**
     *
     * @returns {string}
     */
    static buildMessage(target: Type<any> | string) {
        const name = typeof target === "string" ? target : getClassName(target);

        return `Controller ${name} not found.`;
    }
}