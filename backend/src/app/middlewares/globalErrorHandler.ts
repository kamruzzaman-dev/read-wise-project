/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import { handleValidationError } from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import { handleCastError } from '../../errors/handleCastError';
import ApiError from '../../errors/apiError';
import { ZodError } from 'zod';

// Global error handler middleware
const globalErrorHandler: ErrorRequestHandler = (
  err, // Error object representing a validation error
  req, // Express request object
  res, // Express response object
  next // Express next function
) => {
  // Log errors in production environment otherwise log in console
  config.node_env === 'development'
    ? console.log(`😲 globalErrorHander =>`, err)
    : console.log(`😲 globalErrorHander =>`, err);

  let statusCode = 500; // Default status code for internal server errors
  let message = 'Something went wrong!'; // Default error message
  let errorMessage: IGenericErrorMessage[] = []; // Array to store detailed error messages

  // Check if the error is a validation error
  if (err?.name === 'ValidationError') {
    // Handle the validation error
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
  }
  // Checi if the error is an instance of ZodError
  else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
  }
  // Check if the error is a cast error
  else if (err?.name === 'CastError') {
    // Handle the cast error
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
  }
  // Check if the error is an instance of the custom ApiError class
  else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }
  // Check if the error is a generic Error object
  else if (err instanceof Error) {
    message = err?.message;
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.node_env !== 'production' ? err.stack : undefined,
  });
};

export default globalErrorHandler;
