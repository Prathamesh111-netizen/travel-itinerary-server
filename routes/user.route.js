const express = require("express");

const router = express.Router();

const { protectRoute, isAdmin } = require("../middleware/auth.middleware");

const {
  registerUser,
  getUserById,
  login,
} = require("../controllers/user.controller");

router.route("/").post(registerUser);

router.post("/login", login);

router.route("/:id").get(protectRoute, getUserById);

module.exports = router;

