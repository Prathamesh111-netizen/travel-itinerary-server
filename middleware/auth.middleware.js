const jwt = require("jsonwebtoken");
const { User, ApiToken } = require("../config/db");

const protectRoute = async (req, res, next) => {
  try {
    let token;
    // if the header includes a Bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // get only the token string
        token = req.headers.authorization.split(" ")[1];

        // decode the token to get the corresponding user's id
        const decodedToken = jwt.verify(
          token,
          process.env.JWT_ACCESS_TOKEN_SECRET
        );

        // fetch that user from db, but not get the user's password and set this fetched user to the req.user
        req.user = await User.findById(decodedToken.id).select("-password");
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorised. Token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorised. No token");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) next();
  else {
    res.status(401);
    throw new Error("Not authorised admin");
  }
};

const isAPItokenAuthorised = async (req, res, next) => {
  try {
    let token;
    // if the header includes a Bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // get only the token string
        token = req.headers.authorization.split(" ")[1];

        const isApiTokenValid = await ApiToken.findOne({ token: token });
        if (!isApiTokenValid) {
          throw new Error("Invalid API token");
        }

        if (token.usage >= token.maxLimit) {
          throw new Error("API token usage limit exceeded");
        }

        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorised. Token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorised. No token");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { protectRoute, isAdmin, isAPItokenAuthorised };
