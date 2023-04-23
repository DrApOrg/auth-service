import { BaseError } from "./BaseError"

export class EmailRegistrationError extends BaseError {
    constructor(){
        super("email is already registered")
        Object.setPrototypeOf(this, EmailRegistrationError.prototype)
    }
}