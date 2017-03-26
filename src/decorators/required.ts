import EndpointParam from "../controllers/endpoint-param";

/**
 * Add required annotation for a function argument .
 * @returns {Function}
 */
export function Required(): any {

    return (target: Function, propertyKey: string | symbol, parameterIndex: number): void => {

        if (typeof parameterIndex === "number") {

            EndpointParam.required(target, propertyKey, parameterIndex);

        }

    };

}