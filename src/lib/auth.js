const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const { isAfter, addHours } = require('date-fns');
require('dotenv').config();
const { User, SessionLog, UserSession } = require('../schemas');
const AppError = require('./appError');
var xss = require('xss');

const ACCESS_TOKEN_COOKIE = 'access';
const REFRESH_TOKEN_COOKIE = 'refresh';
const JWT_TOKEN_SECRET = process.env.TOKEN_SECRET || '123qwe';
const REFRESH_TOKEN_TTL_HOURS = Number.parseInt(process.env.REFRESH_TOKEN_TTL, 10) || 48;
const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || '15m';

async function saveUserSessionLog(req, user) {
  const sessionLog = await new SessionLog({ user: user._id, ip: req.headers['x-forwarded-for'] || req.ip }).save();
  return sessionLog;
}

function getTokens(userId) {
  const accessToken = jsonWebToken.sign({ id: userId }, JWT_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
  const refreshToken = uuid() + uuid();
  return { accessToken, refreshToken };
}

async function changePassword(req, res, next) {
  try {
    const { login, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ login:xss(login) }).exec();
    if (!user) {
      throw new AppError('user not found', 400);
    }
    const correctPassword = await user.comparePassword(oldPassword);
    if (!correctPassword) {
      throw new AppError('incorrect password', 400);
    }
    if (oldPassword === newPassword) {
      throw new AppError('cannot set the same password', 400);
    }
    const hash = await bcrypt.hash(newPassword, 12);
    await User.updateOne({ login:xss(login) }, { password: hash, passwordExpired: false }).exec();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login: xss(login) }).exec();
    if (!user) {
      throw new AppError('Invalid username or password', 400);
    }
    const correctPassword = await user.comparePassword(xss(password), { failureRedirect: '/login', failureMessage: true });
    if (!correctPassword) {
      throw new AppError('Invalid username or password', 400);
    }
    if (!user.active) {
      throw new AppError('This user is blocked', 403);
    }
    if (user.passwordExpired) {
      throw new AppError('New password is required', 403);
    }
    const { password: encryptedPassword, ...rest } = user._doc;
    await saveUserSessionLog(req, user);
    const { accessToken, refreshToken } = getTokens(user._id.toString());
    await new UserSession({ user: user._id, accessToken, refreshToken, expired: false }).save();
    res.cookie(ACCESS_TOKEN_COOKIE, accessToken);
    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken);
    return res.json(rest);
  } catch (err) {
    return next(err);
  }
}

async function setUserMiddleware(req, res, next) {
  const { [ACCESS_TOKEN_COOKIE]: accessToken } = req.cookies;
  if (!accessToken) {
    return next();
  }
  try {
    const decoded = jsonWebToken.verify(accessToken, JWT_TOKEN_SECRET);
    const { id } = decoded;
    const session = await UserSession.findOne({ accessToken, expired: false }).exec();
    if (session?.user?.toString() === id) {
      const user = await User.findById(id).select('-password').exec();
      req.user = user;
    } else {
      req.accessTokenExpired = true;
    }
    return next();
  } catch (accessTokenError) {
    if (accessTokenError instanceof jsonWebToken.TokenExpiredError) {
      req.accessTokenExpired = true;
    }
    return next();
  }
}

async function refreshUserToken(req, res) {
  const { [ACCESS_TOKEN_COOKIE]: accessToken, [REFRESH_TOKEN_COOKIE]: refreshToken } = req.cookies;
  const [session, expiredToken] = await Promise.all([
    UserSession.findOne({ accessToken, refreshToken, expired: false }).exec(),
    UserSession.findOne({ family: { $in: [refreshToken] }, expired: false }).exec(),
  ]);
  const isSessionExpired = isAfter(new Date(), addHours(session?.updatedAt, REFRESH_TOKEN_TTL_HOURS));
  if (expiredToken || isSessionExpired) {
    //  console.log('invalid token', expiredToken, isSessionExpired);
    await UserSession.updateOne({ _id: expiredToken?._id || session._id }, { expired: true });
    res.clearCookie(ACCESS_TOKEN_COOKIE);
    res.clearCookie(REFRESH_TOKEN_COOKIE);
    return res.status(403).json({ error: 'refresh token already expired, session ended' });
  }
  if (session && session.user) {
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = getTokens(session.user.toString());
    await UserSession.updateOne(
      { _id: session._id },
      { accessToken: newAccessToken, refreshToken: newRefreshToken, $push: { family: refreshToken } },
    );
    /*
    console.log('session update', update);
    console.log('old tokens', accessToken, refreshToken);
    console.log('new tokens', newAccessToken, newRefreshToken);
    */
    res.cookie(ACCESS_TOKEN_COOKIE, newAccessToken);
    res.cookie(REFRESH_TOKEN_COOKIE, newRefreshToken);
    return res.json({ success: true });
  }
  //  console.log('invalid token', session);
  return res.status(403).json({ error: 'session not found' });
}

async function logoutUser(req, res) {
  const { [ACCESS_TOKEN_COOKIE]: accessToken, [REFRESH_TOKEN_COOKIE]: refreshToken } = req.cookies || {};
  if (accessToken || refreshToken) {
    await UserSession.updateOne(
      {
        $or: [
          {
            accessToken,
          },
          {
            refreshToken,
          },
        ],
      },
      { expired: true },
    );
  }
  res.clearCookie('connect.sid');
  res.clearCookie(ACCESS_TOKEN_COOKIE);
  res.clearCookie(REFRESH_TOKEN_COOKIE);
  res.status(200).end();
}

module.exports = {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  refreshUserToken,
  loginUser,
  logoutUser,
  setUserMiddleware,
  changePassword,
  setUser: (req, res, next) => {
    res.locals.user = req.user;
    return next();
  },
  authorizedOnly: (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'unauthorized request', expiredAccessToken: req?.accessTokenExpired || false });
    }
    return next();
  },
};
