import { Schema } from "mongoose";
import { AccountType } from "../../../domain/models/account";

export const accountSchema = new Schema({
    accountType: {
        type: String,
        enum: AccountType,
    },
    lastName: {type: String},
    firstName: {type: String},
    name: {type: String},
    dni: {type: Number}, 
    phone: {type: Number, require: true}, 
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