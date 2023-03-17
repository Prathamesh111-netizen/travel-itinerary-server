const express = require("express");

const router = express.Router();

const {
    itineraryController: { getResult },
} = require("../../controllers/v1/index.js");

router.route("/").post(getResult);

module.exports = router;
