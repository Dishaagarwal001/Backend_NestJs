export interface ErrorBody extends Error {
    code: string;
}
export declare const errorMessages: {
    auth: {
        wronCredentials: {
            message: string;
            code: string;
        };
        userAlreadyExist: {
            message: string;
            code: string;
        };
        expiredToken: {
            message: string;
            code: string;
        };
        invlidToken: {
            message: string;
            code: string;
        };
        notAllowed: {
            message: string;
            code: string;
        };
    };
    user: {
        notFound: {
            message: string;
            code: string;
        };
    };
    role: {
        notFound: {
            message: string;
            code: string;
        };
    };
    category: {
        notFound: {
            message: string;
            code: string;
        };
    };
    product: {
        notFound: {
            message: string;
            code: string;
        };
        notFulfilled: {
            message: string;
            code: string;
        };
    };
    global: {
        internalError: {
            message: string;
            code: string;
        };
    };
};
