import { createSelector } from '@reduxjs/toolkit';
import appRoles from '../../shared/constants/appRoles';


export const selectUserSlice = (state) => state.user;

export const selectUser = createSelector(
  selectUserSlice,
  (state) => state.user,
);

export const selectUserId = createSelector(
  selectUser,
  (state) => state?._id,
);

export const selectIsLogged = createSelector(
  selectUserSlice,
  (state) => (!!state.user),
);

export const selectUserIsLoading = createSelector(
  selectUserSlice,
  (state) => state.isLoading,
);

export const selectUserIsExpired = createSelector(
  selectUserSlice,
  (state) => state.isExpired,
);

export const selectUserRole = createSelector(
  selectUser,
  (state) => state?.appRole,
);

export const selectIsSuperAdmin = createSelector(
  selectUserRole,
  (state) => state === appRoles.USER,
);

export const selectIsManager = createSelector(
  selectUserRole,
  (state) => state === appRoles.MANAGEMENT,
);

export const selectHasAdminRole = createSelector(
  selectUserRole,
  (state) => [appRoles.ADMIN, appRoles.USER].includes(state),
);

export const selectIsAdmin = createSelector(
  selectUserRole,
  (state) => state === appRoles.ADMIN,
);

export const selectHasAnalyticsAccess = createSelector(
  selectUserRole,
  (state) => ![appRoles.ADMIN, appRoles.USER].includes(state),
);

export const selectHasScopeAccess = createSelector(
  selectUserRole,
  (state) => state !== appRoles.ADMIN,
);
