import { RequestHandler } from "express";
import { HttpError } from "../httpErrot";

export const adminAuth: RequestHandler = (req, _res, next) => {
  const expected = process.env.ADMIN_KEY ?? "secret";
  if (req.header("X-Admin-Key") !== expected) {
    next(new HttpError(403, "Forbidden"));
    return;
  }
  next();
};
