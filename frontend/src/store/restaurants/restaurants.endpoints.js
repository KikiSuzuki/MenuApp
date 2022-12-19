export const restaurantsEndpoints = (builder) => ({
  getRestaurants: builder.query({
    query: () => ({ url: 'restaurants' }),
    providesTags: ['restaurants'],
  }),
  postRestaurants: builder.mutation({
    query: (body) => ({
      url: 'restaurants',
      method: 'POST',
      body,
    }),
    invalidatesTags: ['restaurants'],
  }),
  postRestaurantsRate: builder.mutation({
    query: (id, value) => ({
      url: `restaurants/${id}/rate/${value}`,
      method: 'POST',
    }),
    invalidatesTags: ['restaurants'],
  }),
  deleteRestaurants: builder.mutation({
    query: (id) => ({
      url: `restaurants/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['restaurants'],
  }),
});
