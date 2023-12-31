/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getFromLocalStorage } from '../../utils/localStorage.ts';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:5000/api/v1',
    baseUrl: 'https://read-wise.onrender.com/api/v1',
    prepareHeaders: (headers) => {
      headers.set('authorization', getFromLocalStorage('access-token')!);
      return headers;
    },
  }),
  tagTypes: ['books'],
  endpoints: () => ({}),
});

export default api;
