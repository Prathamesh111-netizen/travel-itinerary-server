const express = require("express");

const router = express.Router();

const { getResult } = require("../controllers/itinerary.controller");

router.route("/").post(getResult);

module.exports = router;
