import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (queries) => `/books?${queries}`,
      providesTags: ['books'],
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ['books'],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: `/books`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    updateBook: builder.mutation({
      query: ({ bookData, id }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: bookData,
      }),
      invalidatesTags: ['books'],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books'],
    }),
    addReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/add-review/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  useAddReviewMutation,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
