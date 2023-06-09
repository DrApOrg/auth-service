import { IAccount } from "@domain/models/account";
import { model } from "mongoose";
import { accountSchema } from "./account.schema";

export const accountDao = model<IAccount>('Account', accountSchema)