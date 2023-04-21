import httpStatusCodes from "http-status-codes";
import { HttpErroRequest } from "../../utils/error";
import {
  Request,
  Response,
} from 'express';

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
) => {
  let status = httpStatusCodes.INTERNAL_SERVER_ERROR;

  if (err instanceof HttpErroRequest) {
    status = httpStatusCodes.BAD_REQUEST;
  }

  return res.status(status).send({
      name: err.name,
      message: err.message,
    });
};