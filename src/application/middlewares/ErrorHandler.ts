import httpStatusCodes from "http-status-codes";
import type {
  ErrorRequestHandler,
  Request,
  Response
} from 'express';
import { AuthenticationError, BaseError, EmailRegistrationError } from "../../domain/Exceptions";
import { ErrorPayload } from "../../domain/Payload/Error";

export const ErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {

  let ErrorPayload: ErrorPayload  = {
    message: '',
    statuscode: 500
  }

  switch(err) {
    case new AuthenticationError:
      ErrorPayload.message = err.message
      ErrorPayload.statuscode = 401
      break
    case new EmailRegistrationError:
      ErrorPayload.message = err.message
      ErrorPayload.statuscode = 409
      break
    default:
      ErrorPayload.message = err.message
      ErrorPayload.statuscode = 500
      break
  }

  res
    .status(ErrorPayload.statuscode)
    .send(ErrorPayload)
};