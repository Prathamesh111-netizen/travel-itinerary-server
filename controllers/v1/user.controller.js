const { User, ApiToken, AccessToken } = require("../../config/db");
const { v4: uuidv4 } = require("uuid");
const generateToken = require("../../utils/generateToken");

// @desc register a new user
// @route POST /api/users/
// @access PUBLIC
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.find({ email });

    if (userExists.length > 0) {
      res.status(400);
      throw new Error("Email already registered");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    // if user was created successfully
    if (user) {
      // generate API tokens
      const apiToken = uuidv4();
      ApiToken.create({
        email: user.email,
        token: apiToken,
      });

      const accessToken = generateToken(user._id, "access");
      AccessToken.create({
        email: user.email,
        token: accessToken,
      });

      res.status(201).json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          isConfirmed: user.isConfirmed,
          apiToken: apiToken,
          accessToken: accessToken,
        },
      });
    } else {
      res.status(400);
      throw new Error("User not created");
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

    // if the passwords are matching, then check if a refresh token exists for this user
    if (user && (await user.matchPassword(password))) {
      const accessToken = generateToken(user._id, "access");
      const existingToken = await AccessToken.findOne({ email });

      // if no refresh token available, create one and store it in the db
      if (!existingToken) {
        // generate both the access and the refresh tokens
        await AccessToken.create({
          email,
          token: accessToken,
        });
      } else {
        existingToken.token = accessToken;
        existingToken.save();
      }

      // const apiToken = await ApiToken.findOne({ email });

      res.send({
        success: true,
        data: {
          id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          profilephoto: user.profilephoto,
          isConfirmed: user.isConfirmed,
          avatar: user.avatar,
          accessToken: accessToken,
          // apiToken: apiToken.token,
        },
      });
    } else {
      res.status(401);
      throw new Error(user ? "Invalid Password" : "Invalid email");
    }
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc get user by ID
// @route GET /api/users/:id
// @access PRIVATE/ADMIN
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");
    // const apiToken = await ApiToken.findOne({ email: user.email });

    if (user)
      res.json({
        success: true,
        data: {
          id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          isConfirmed: user.isConfirmed,
          // apiToken: apiToken.token,
        },
      });
    else {
      res.status(404);
      throw new Error("User does not exist");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserById, registerUser, getUsers, login };
