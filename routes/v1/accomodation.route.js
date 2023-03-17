const express = require("express");

const router = express.Router();

const {
  accomodationController: { getHotelbyID, getHotelbyCity, getHotelByGeocode },
} = require("../../controllers/v1/index.js");

router.get("/hotels/:id", getHotelbyID);

router.get("/hotels/by-city/:cityCode", getHotelbyCity);

router.get("/hotels/by-geocode/:latitude/:longitude", getHotelByGeocode);


module.exports = router;
