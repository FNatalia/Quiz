import { ErrorRequestHandler, RequestHandler } from "express";
import { HttpError } from "../httpErrot";

export const notFound: RequestHandler = (req, res, next) =>{
  const message = `Route ${req.method} ${req.path} not found`;
  next(new HttpError(404, message));
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message, details: err.details });
    return;
  }
  res.status(500).json({ error: String(err) });
};
