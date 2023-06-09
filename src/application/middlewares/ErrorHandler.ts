import type {
  ErrorRequestHandler,
  Request,
  Response
} from 'express';
import { 
  PhoneRegistrationError, 
  AuthenticationError, 
  BaseError, 
  EmailRegistrationError 
} from "../../domain/Exceptions";
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

  // TODO: change Registration Error control
  switch(err) {
    case AuthenticationError:
      ErrorPayload.message = err.message
      ErrorPayload.statuscode = 401
      break
    case EmailRegistrationError:
      ErrorPayload.message = err.message
      ErrorPayload.statuscode = 409
      break
    case PhoneRegistrationError:
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