const express = require("express");

const router = express.Router();

const {
  accomodationController: { getHotelbyID, getHotelbyCity, getHotelByGeocode },
} = require("../../controllers/v1/index.js");

module.exports = router;
