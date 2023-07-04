import { Schema } from "mongoose";
import { AccountType } from "../../../domain/models/account";

export const accountSchema = new Schema({
    accountType: {
        type: String,
        enum: AccountType,
        required: true
    },
    image: {type: String, require: true},
    lastName: {type: String, required: true},
    firstName: {type: String, required: true },
    name: {type: String, required: true },
    dni: {type: Number, required: true}, 
    phone: {type: Number, required: true}, 
    email: {type: String}, 
    password: {type: String}, 
}, {
    timeStamp: true,
    id: true,
    toJSON: {
        transform (doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
})