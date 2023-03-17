const express = require("express");

const router = express.Router();

const {
  commuteController: { getFlights },
} = require("../../controllers/v1/index.js");

router.route("/flights/:from/:to/:date").get(getFlights);

module.exports = router;
