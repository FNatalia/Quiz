import { RequestHandler } from "express";

export const requestLogger: RequestHandler = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = (Date.now() - start).toFixed(1);
        const id = res.locals.requestId || '-';
        console.log(`[${id}] ${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
    });
    next()
};
