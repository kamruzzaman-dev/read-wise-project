import { NextFunction, Request, RequestHandler, Response } from 'express';

// Function to wrap an asynchronous request handler with error handling.
// The purpose of this function is to optimize the repetition of the try catch code of our controller.

const catchAsync = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next); // Call the provided request handler function
    } catch (error) {
      next(error); // Call the next middleware or error handler in case of an error
    }
  };
};

export default catchAsync;
