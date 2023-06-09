import { BaseError } from "./BaseError"

export class InvalidPhone extends BaseError {
    constructor(){
        super("invalid phone")
        Object.setPrototypeOf(this, InvalidPhone.prototype)
    }
}