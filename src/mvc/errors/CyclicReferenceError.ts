/**
 * @module mvc
 */ /** */

import {InternalServerError} from "ts-httpexceptions";
/**
 * @private
 */
export class CyclicReferenceError extends InternalServerError {

    name: "CYCLIC_REFERENCE_ERROR";

    constructor(c1: string, c2: string) {
        super(CyclicReferenceError.buildMessage(c1, c2));
    }

    /**
     *
     * @returns {string}
     */
    static buildMessage(c1: string, c2: string) {
        return `Cyclic reference between ${c1} and ${c2}.`;
    }
}