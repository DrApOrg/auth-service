import httpStatusCodes from "http-status-codes";
import { HttpErroRequest } from "../../utils/error";
import type {
  ErrorRequestHandler,
  Request,
  Response
} from 'express';
import { BaseError, EmailRegistrationError } from "../../domain/Exceptions";
import { ErrorPayload } from "../../domain/Payload/Error";

export const ErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {

  console.log("entor")
  let ErrorPayload: ErrorPayload  = {
    message: 'error',
    statuscode: 500
  }

  switch(err) {
    case new EmailRegistrationError:
      ErrorPayload.message = err.message
      ErrorPayload.statuscode = 409
      break
    default:
      console.log('default')
      break
  }

  res
    .status(ErrorPayload.statuscode)
    .send(ErrorPayload)
};