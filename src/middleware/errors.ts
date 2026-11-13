import { ErrorRequestHandler, RequestHandler } from "express";

export const notFound: RequestHandler = (_req, _res, next) => next();
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(500).json({ error: String(err) });
};
