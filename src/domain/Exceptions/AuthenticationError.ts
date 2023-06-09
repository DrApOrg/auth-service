import { BaseError } from "./BaseError";

export class AuthenticationError extends BaseError {
    constructor() {
        super("incorrect password or email")
        Object.setPrototypeOf(this, AuthenticationError.prototype)
    }
}