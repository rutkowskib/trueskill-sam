export interface IAsyncActionConstants {
    PENDING: string;
    FULFILLED: string;
    REJECTED: string;
}

export const createAsyncActionConstants = (action: string): IAsyncActionConstants => {
    return {
        PENDING: `${action}_PENDING`,
        FULFILLED: `${action}_FULFILLED`,
        REJECTED: `${action}_REJECTED`,
    };
};

export const passValueToUrl = (path: string, value: string) => {
    return path.replace(/(\$\$|:id|:lang|:name)/, value);
};