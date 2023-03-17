const express = require("express");
const {
  locationController: {
    getLocationScore,
    getShoppingActivities,
    getShoppingActivityByID,
    getLocationPOI,
    getLocationPOIByID,
  },
} = require("../../controllers/v1/index.js");

const router = express.Router();

router.route("/score").get(getLocationScore);
router.route("/shopping").get(getShoppingActivities);
router.route("/shopping/:id").get(getShoppingActivityByID);
router.route("/poi").get(getLocationPOI);
router.route("/poi/:id").get(getLocationPOIByID);

module.exports = router;
