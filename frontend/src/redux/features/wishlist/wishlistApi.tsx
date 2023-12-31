import api from '../../api/apiSlice';

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: `/wishlist/${data?.userId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    getWishlist: builder.query({
      query: (id) => ({
        url: `/wishlist`,
        method: 'GET',
      }),
      providesTags: ['books'],
    }),
  }),
});

export const { useAddToWishlistMutation, useGetWishlistQuery } = wishlistApi;
