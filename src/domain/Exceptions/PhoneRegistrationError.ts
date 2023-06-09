import { BaseError } from "./BaseError"

export class PhoneRegistrationError extends BaseError {
    constructor(){
        super("phone is already registered")
        Object.setPrototypeOf(this, PhoneRegistrationError.prototype)
    }
}