import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { envConfig } from "../../../env";
import { getLocalStorage } from "../../../utils/localStorage";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.BASE_URL,
    mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("token") as string)
      return headers;
    },
  }),
  tagTypes: ["User"], // automatic-data fetching
  endpoints: (builder) => ({
    getLoginUser: builder.query({
      query: () => "/secure/api/v1/fetch_user",
      providesTags: ["User"],
    }),
    getValidateEmail: builder.query({
      query: (email) => "/secure/api/v1/email",
      providesTags: ["User"],
    }),
    // for auth user
    addUser: builder.mutation({
      query: (body) => ({
        url: "/public/api/v1/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    addLogin: builder.mutation({
      query: (body) => ({
        url: "/public/api/v1/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetLoginUserQuery,
  useAddUserMutation,
  useAddLoginMutation,
  useGetValidateEmailQuery
} = userApi;