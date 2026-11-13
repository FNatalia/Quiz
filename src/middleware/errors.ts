import { ErrorRequestHandler, RequestHandler } from "express";
import { HttpError } from "../httpErrot";

export const notFound: RequestHandler = (_req, _res, next) => next();
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message, details: err.details });
    return;
  }
  res.status(500).json({ error: String(err) });
};
