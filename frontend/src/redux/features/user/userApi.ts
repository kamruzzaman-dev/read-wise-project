import api from '../../api/apiSlice';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
    refreshToken: builder.mutation({
      query: (data) => ({
        url: `/auth/refresh-token`,
        method: 'POST',
        body: data,
      }),
    }),
    addGoogleAuth: builder.mutation({
      query: (body) => ({
        url: '/auth/google_auth',
        method: 'POST',
        body: {
          tokenId: body,
        },
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useAddGoogleAuthMutation,
} = userApi;
