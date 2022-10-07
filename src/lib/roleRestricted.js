const appRolesEnum = require('./appRoles.enum');

function roleRestricted(role = []) {
  return function roleRestrictedMiddleware(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized access', expiredAccessToken: req?.accessTokenExpired || false });
    }
    if (Array.isArray(role)) {
      if (role.includes(req.user?.appRole)) {
        return next();
      }
      return res.status(403).json({ error: 'This route is restricted' });
    }
    throw new Error('Incorrect middleware usage');
  };
}

const adminAccess = roleRestricted([appRolesEnum.ADMIN]);
const notAdminAccess = roleRestricted([appRolesEnum.USER, appRolesEnum.BUSINESS, ]);

module.exports = {
  roleRestricted,
  adminAccess,
  notAdminAccess,
};
