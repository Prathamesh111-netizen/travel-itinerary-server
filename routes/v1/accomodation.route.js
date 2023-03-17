const express = require("express");

const router = express.Router();

const {
  accomodationController: { getHotelbyID, getHotelbyCity, getHotelByGeocode, getHotelratings },
} = require("../../controllers/v1/index.js");

router.get("/hotels/ratings", getHotelratings);


router.get("/hotels/by-city/:cityCode", getHotelbyCity);

router.get("/hotels/by-geocode/:latitude/:longitude", getHotelByGeocode);

router.get("/hotels/:id", getHotelbyID);


module.exports = router;
