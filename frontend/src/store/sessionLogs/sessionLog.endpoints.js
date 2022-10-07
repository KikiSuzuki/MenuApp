export const sessionLogsEndpoints = (builder) => ({
  getSessionLogs: builder.query({
    query: (params = {}) => ({
      url: 'session-logs',
      params,
    }),
    providesTags: ['sessionLogs'],
  }),
});
