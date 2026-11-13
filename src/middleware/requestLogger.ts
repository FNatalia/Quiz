import { RequestHandler } from "express";

export const requestLogger: RequestHandler = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = (Date.now() - start).toFixed(1);
        console.log(`${req.method} ${req.path} ${req.statusCode} ${duration}ms`);
    });
    next()
};
