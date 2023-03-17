const express = require("express");

const router = express.Router();

const {
  commuteController: { getFlights, getBuses },
} = require("../../controllers/v1/index.js");

router.route("/bus").get(getBuses);

router.route("/flights/:from/:to/:date").get(getFlights);


module.exports = router;
