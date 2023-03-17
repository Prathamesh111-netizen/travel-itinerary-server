const express = require("express");

const router = express.Router();

const {
  currencyController: { getLiveConversionRate, getAllCurrencies },
} = require("../../controllers/v1/index.js");

router.route("/:base/:to").get(getLiveConversionRate);

router.route("/").get(getAllCurrencies);

module.exports = router;
