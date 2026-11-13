import { RequestHandler } from "express";

export const requestLogger: RequestHandler = (_req, _res, next) => next();
