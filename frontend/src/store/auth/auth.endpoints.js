export const authEndpoints = (builder) => ({
  logout: builder.mutation({
    query: () => ({
      url: 'logout',
      method: 'POST',
    }),
    invalidatesTags: ['scope', 'signature', 'signatures', 'scopeSingle', 'workRiskAssessment', 'permit', 'profile'],
  }),
});
