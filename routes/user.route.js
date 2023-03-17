const express = require("express");

const router = express.Router();

const { protectRoute, isAdmin } = require("../middleware/auth.middleware");

const { registerUser, getUserById, getUsers , login} = require("../controllers/user.controller");

router.route("/login").post(login);

router.route("/:id").get(getUserById);

router.route("/").post(registerUser).get(getUsers);


module.exports = router;
