const express = require("express");

const router = express.Router();

const { protectRoute, isAdmin } = require("../../middleware/index.js");

const {
  userController: { registerUser, getUserById, getUsers, login },
} = require("../../controllers/v1/index.js");

router.route("/login").post(login);

router.route("/").post(registerUser).get(protectRoute, getUserById);

module.exports = router;
