/**
 * @module core
 */ /** */

import {InternalServerError} from "ts-httpexceptions";
/**
 * @private
 */
export class CastedError extends InternalServerError {
    origin: Error;

    constructor(err: Error) {
        super(err.message);
        this.stack = err.stack;
        this.origin = err;
    }
}