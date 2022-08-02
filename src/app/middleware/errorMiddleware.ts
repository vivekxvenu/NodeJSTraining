import { NextFunction, Request, Response } from "express";
import { Formatter } from "../util/formatter";
import HttpException from "../exception/HttpException";

const fmt: Formatter = new Formatter();

/**
 * Global handler for Errors sending the message and status
 * @param error
 * @param request
 * @param response
 * @param next
 */
const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  const errorCode = error.errorCode || "ERROR_CODE_NOT_FOUND";
  const validationErrors = error.validationErrors;
  response
    .status(status)
    .send(fmt.formatResponse(new HttpException(status, message, errorCode, validationErrors), 0, message));
};

export default errorMiddleware;
