const { User, Token } = require("../config/db");
const generateToken = require("../utils/generateToken");
const generateGravatar = require("../utils/generateGravatar");

// @desc get user by ID
// @route GET /api/users/:id
// @access PRIVATE/ADMIN
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user)
      res.json({
        success: true,
        data: user,
      });
    else {
      res.status(404);
      throw new Error("User does not exist");
    }
  } catch (error) {
    next(error);
  }
};

// @desc authenticate user and get token
// @route POST /api/users/login
// @access PUBLIC
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    // generate both the access and the refresh tokens
    const accessToken = generateToken(user._id, "access");
    const refreshToken = generateToken(user._id, "refresh");

    // if the passwords are matching, then check if a refresh token exists for this user
    if (user && (await user.matchPassword(password))) {
      const existingToken = await Token.findOne({ email });
      // if no refresh token available, create one and store it in the db
      if (!existingToken) {
        await Token.create({
          email,
          token: refreshToken,
        });
      } else {
        existingToken.token = refreshToken;
        existingToken.save();
      }

      res.json({
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        profilephoto: user.profilephoto,
        isConfirmed: user.isConfirmed,
        avatar: user.avatar,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401);
      throw new Error(user ? "Invalid Password" : "Invalid email");
    }
  } catch (error) {
    next(error);
  }
};

// @desc register a new user
// @route POST /api/users/
// @access PUBLIC
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("Email already registered");
    }

    // the gravatar will be unique for each registered email
    const avatar = generateGravatar(email);

    const user = await User.create({
      name,
      email,
      password,
    });

    // if user was created successfully
    if (user) {
      const refreshToken = generateToken(user._id, "refresh");
      res.status(201).json({
        id: user._id,
        email: user.email,
        name: user.name,
        avatar,
        isAdmin: user.isAdmin,
        isConfirmed: user.isConfirmed,
        accessToken: generateToken(user._id, "access"),
        refreshToken,
        contact,
        organization,
      });
    } else {
      res.status(400);
      throw new Error("User not created");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserById, registerUser, login };
