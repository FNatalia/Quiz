import { RequestHandler } from "express";
import { randomUUID } from "node:crypto";

export const requestId: RequestHandler = (_req, res, next) => {
    const id = randomUUID();

    res.locals.requestId = id;

    res.setHeader("X-Request-Id", id);

    next();
};