
class HttpCustomError extends Error {
    private statuscode: string;
    private detail: HttpCustomError[] | null;

    constructor(
        code: string,
        message: string | null = null,
        details: HttpCustomError[] | null = null,
    ) {
        super(message || code);
        this.statuscode = code;
        this.detail = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class HttpErroRequest extends HttpCustomError {
    constructor(message: string, details: HttpErroRequest[]) {
        super('BAD_REQUEST', message,  details)
    }
}