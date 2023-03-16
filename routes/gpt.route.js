const express = require("express");

const router = express.Router();

const { getGPT } = require("../controllers/gpt.controller");

router.route("/").post(getGPT);

module.exports = router;
