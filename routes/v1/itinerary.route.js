const express = require("express");

const router = express.Router();

const {
  itineraryController: { getResult },
} = require("../../controllers/v1/index.js");

const { isAPItokenAuthorised } = require("../../middleware/index.js");

// router.route("/").post(isAPItokenAuthorised, getResult);
router.route("/").post(getResult);

module.exports = router;
