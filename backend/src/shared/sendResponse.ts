import { Response } from 'express';

// Define a generic interface for the API response
type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

// Function to send the API response
const sendResponse = <T>(res: Response, data: IApiResponse<T>) => {
  const responseData: IApiResponse<T> = {
    statusCode: data?.statusCode, // Assign the status code from the data object
    success: data?.success, // Assign the success flag from the data object
    message: data?.message, // Assign the message from the data object
    meta: data?.meta || null || undefined, // Assign the meta data from the data object
    data: data?.data || null || undefined, // Assign the data from the data object or null if it's undefined
  };
  res.status(data?.statusCode).json(responseData); // Set the response status code and send the JSON response
};

export default sendResponse;
