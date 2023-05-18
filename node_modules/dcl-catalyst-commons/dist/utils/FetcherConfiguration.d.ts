export declare type RequestOptions = Partial<CompleteRequestOptions>;
export declare type CrossFetchRequest = {
    requestInfo: string | RequestInfo;
    requestInit?: RequestInit;
};
export declare type CompleteRequestOptions = {
    method: string;
    attempts: number;
    timeout: string;
    waitTime: string;
    body?: FormData | string;
    headers?: Record<string, string>;
    cookies?: Record<string, string>;
    requestMiddleware?: (request: CrossFetchRequest) => Promise<CrossFetchRequest>;
    responseMiddleware?: (response: Response) => Promise<Response>;
};
export declare function getAllHeaders(options: CompleteRequestOptions): Record<string, string>;
export declare const FETCHER_DEFAULTS: {
    method: string;
    attempts: number;
    waitTime: string;
    timeout: string;
};
export declare const FETCH_JSON_DEFAULTS: {
    timeout: string;
    waitTime: string;
    method: string;
    attempts: number;
};
export declare const FETCH_BUFFER_DEFAULTS: {
    timeout: string;
    method: string;
    attempts: number;
    waitTime: string;
};
export declare const POST_DEFAULTS: {
    method: string;
    attempts: number;
    waitTime: string;
    timeout: string;
};
