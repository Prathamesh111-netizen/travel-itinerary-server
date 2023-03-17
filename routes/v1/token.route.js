const express = require("express");

const {
  tokenController: { getAPItoken, deleteAPItoken },
} = require("../../controllers/v1/index.js");

const { protectRoute } = require("../../middleware/index.js");

const router = express.Router();

router
  .route("/")
  .get(protectRoute, getAPItoken)
  .delete(protectRoute, deleteAPItoken);

module.exports = router;
