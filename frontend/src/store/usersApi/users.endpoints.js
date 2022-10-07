export const usersEndpoints = (builder) => ({
  getProfile: builder.query({
    query: () => ({ url: 'user/profile' }),
    providesTags: ['profile'],
  }),
  updateProfile: builder.mutation({
    query: (body) => ({
      url: 'user/profile',
      method: 'PUT',
      body,
    }),
    invalidatesTags: ['profile'],
  }),
  getUsers: builder.query({
    query: () => ({ url: 'user' }),
    providesTags: ['users'],
  }),
  getFilteredUsers: builder.query({
    query: (params) => ({ url: 'user/filtered', params }),
    providesTags: ['users'],
  }),
  postUsers: builder.mutation({
    query: (body) => ({
      url: 'user',
      method: 'POST',
      body,
    }),
    invalidatesTags: ['users'],
  }),
  updateUsers: builder.mutation({
    query: ({ body, id }) => ({
      url: `user/${id}`,
      method: 'PUT',
      body,
    }),
    invalidatesTags: ['users'],
  }),
  deleteUsers: builder.mutation({
    query: (id) => ({
      url: `user/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['users'],
  }),
});
