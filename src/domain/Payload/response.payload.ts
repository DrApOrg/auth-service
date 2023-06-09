
export interface ResponsePayload<T> {
    message: string;
    status: number;
    data: T;
}