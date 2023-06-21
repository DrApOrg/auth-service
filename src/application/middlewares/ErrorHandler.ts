import type {
  ErrorRequestHandler,
} from 'express';
import { ResponsePayload } from '@domain/Payload/response.payload';

export const ErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {

  let ErrorPayload: ResponsePayload<{}>  = {
    message: '',
    status: 500,
    data: {}
  }

  // TODO: change Registration Error control
  const errorMappings: {
    [key: string]: {
      message: (err: Error) => any;
      status: number;
    };
  } = {
    AuthenticationError: {
      message: err => err.message,
      status: 401
    },
    EmailRegistrationError: {
      message: err => err.message,
      status: 409
    },
    PhoneRegistrationError: {
      message: err => err.message,
      status: 409
    },
    default: {
      message: err => err.message,
      status: 500
    }
  };

  const errorType = err.constructor.name;
  const errorMapping = errorMappings[errorType] || errorMappings.default;

  ErrorPayload.message = errorMapping.message(err);
  ErrorPayload.status = errorMapping.status;

  res
    .status(ErrorPayload.status)
    .json(ErrorPayload)
};