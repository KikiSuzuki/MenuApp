import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { usersEndpoints } from './usersApi';
import { authEndpoints } from './auth/auth.endpoints';
import { sessionLogsEndpoints } from './sessionLogs';
import { restaurantsEndpoints } from './restaurants';

export const menuApi = createApi({
  reducerPath: 'menuApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL || ''}/`,
  }),
  tagTypes: [
    'users',
    'profile',
    'sessionLogs',
    'restaurants',
  ],
  endpoints: (builder) => ({
    ...usersEndpoints(builder),
    ...authEndpoints(builder),
    ...sessionLogsEndpoints(builder),
    ...restaurantsEndpoints(builder),
  }),
});

export const {
  /**
   * Auth
   */
  useLogoutMutation,
  /**
   * Users
   */
  useGetUsersQuery,
  /**
   * Session logs
   */
  useGetSessionLogsQuery,
    /**
   * Restaurant
   */
  useGetRestaurantsQuery,
  /**
   * Hasd
   */
  usePostRestaurantsMutation,
  usePostRestaurantsRateMutation,
  // useDeleteRestaurantsMutation,
} = menuApi;
