export interface RequestParams {}

export interface ResponseBody {}

export interface RequestBody {}

export interface RequestQuery<T> {
    [key: string]: T;
}
