const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User, Member, Group } = require("../db/models");

const { secret, expiresIn } = jwtConfig;

const unauthorizedError = () => {
  const err = new Error("Unauthorized");
  err.title = "Unauthorized";
  err.errors = ["Unauthorized"];
  err.status = 401;
  return err;
};

const setTokenCookie = (res, user) => {
  // Create the token.
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie("token", token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope("currentUser").findByPk(id);
    } catch (e) {
      res.clearCookie("token");
      return next();
    }

    if (!req.user) res.clearCookie("token");

    return next();
  });
};

const requireAuth = [
  restoreUser,
  function (req, res, next) {
    if (req.user) return next();
    return next(unauthorizedError());
  },
];

const getMembershipStatus = async (userId, groupId) => {
  const membership = await Member.findOne({ where: { userId, groupId } });
  return membership ? membership.status : null;
}

// check if user is organizer or co-host
const hasElevatedMembership = async (userId, groupId) => {
  const group = await Group.findByPk(groupId);
  const isOrganizer = group.organizerId === userId;

  const memberStatus = await getMembershipStatus(userId, groupId);
  return isOrganizer || memberStatus === "co-host";
}

module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth,
  unauthorizedError,
  getMembershipStatus,
  hasElevatedMembership,
};
