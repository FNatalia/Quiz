import { ErrorRequestHandler, RequestHandler } from "express";
import { HttpError } from "../httpErrot";

export const notFound: RequestHandler = (req, res, next) =>{
  const message = `Route ${req.method} ${req.path} not found`;
  next(new HttpError(404, message));
};

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      error: {
        message: err.message,
        details: err.details
      }
    });
    return;
  }

  if(err.type === 'entity.parse.failed'){
    res.status(400).json({
      error: {
        message: 'invalid JSON',
        details: err.message
      }
    })
    return;
  }
  console.error("Unhandled Error:", err);
  res.status(500).json({
    error:{
      message: 'Internal Server Error',
      details: undefined
    }
  });
};
