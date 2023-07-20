import api from "../../api/apiSlice";

const readSoonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToReadSoon: builder.mutation({
      query: (data) => ({
        url: `/readSoon/${data?.userId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    finishedReading: builder.mutation({
      query: ({ bookId, data }) => ({
        url: `/readSoon/finished-reading/${bookId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    getReadSoonList: builder.query({
      query: (id) => ({
        url: `/readSoon`,
        method: 'GET',
      }),
      providesTags: ['books'],
    }),
  }),
});

export const {
  useAddToReadSoonMutation,
  useFinishedReadingMutation,
  useGetReadSoonListQuery,
} = readSoonApi;
