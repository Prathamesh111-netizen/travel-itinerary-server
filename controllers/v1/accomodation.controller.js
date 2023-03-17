const axios = require("axios");
const amadeousTokenGenerator = require("../../utils/amdeous.token.generator");

const url = `${process.env.AMADEUS_API_HOST}/reference-data/locations/hotels`;

const getHotelbyID = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    
    //reference-data/locations/hotels/by-hotels?hotelIds=ACPAR419
    const completeurl = `${url}/by-hotels?hotelIds=${id}`;
    const token = await amadeousTokenGenerator();
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await axios.get(completeurl, config);
    res.status(200).json({
      success: true,
      data: response.data.data,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getHotelbyCity = async (req, res, next) => {
  try {
    const { cityCode } = req.params;

    let { radius, radiusUnit, ratings, amenities } = req.query;
    if (!cityCode) {
      throw new Error("City Code is required");
    }

    radius = radius || 10;
    radiusUnit = radiusUnit || "KM";
    ratings = ratings || [2, 3, 4, 5];
    amenities = amenities || [
      "SWIMMING_POOL",
      "SPA",
      "AIR_CONDITIONING",
      "RESTAURANT",
      "PARKING",
      "PETS_ALLOWED",
      "DISABLED_FACILITIES",
      "JACUZZI",
      "MINIBAR",
      "WIFI_IN_ROOM",
    ];

    ratings = ratings.join(",");
    amenities = amenities.join(",");

    let query = `?cityCode=${cityCode}&radius=${radius}&radiusUnit=${radiusUnit}&ratings=${ratings}&amenities=${amenities}`;

    const completeurl = `${url}/by-city${query}`;

    const token = await amadeousTokenGenerator();
    console.log("Token is", token);
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    console.log(token);
    const response = await axios.get(completeurl, config);
    res.status(200).json({
      success: true,
      data: response.data.data,
    });
  } catch (err) {
    next(err);
  }
};

const getHotelByGeocode = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.params;
    let { radius, radiusUnit, ratings, amenities } =
      req.query;
    if (!latitude || !longitude) {
      throw new Error("Latitude and Longitude are required");
    }
    radius = radius || 10;
    radiusUnit = radiusUnit || "KM";
    ratings = ratings || [2, 3, 4, 5];
    amenities = amenities || [
      "SWIMMING_POOL",
      "SPA",
      "AIR_CONDITIONING",
      "RESTAURANT",
      "PARKING",
      "PETS_ALLOWED",
      "DISABLED_FACILITIES",
      "JACUZZI",
      "MINIBAR",
      "WIFI_IN_ROOM",
    ];

    ratings = ratings.join(",");
    amenities = amenities.join(",");

    
    let query = `?latitude=${latitude}&longitude=${longitude}&radius=${radius}&radiusUnit=${radiusUnit}&ratings=${ratings}&amenities=${amenities}`;
    const completeurl = `${url}/by-geocode${query}`;

    const token = await amadeousTokenGenerator();
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.get(completeurl, config);
    res.status(200).json({
      success: true,
      data: response.data.data,
    });
  } catch (error) {
    next(error);
  }
};

const getHotelratings = async (req, res, next) => {
  try{
    const { hotelIds } = req.query;
    console.log(hotelIds);
    if(!hotelIds){
      throw new Error("Hotels are required");
    }
    const completeurl = `https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments?hotelIds=${hotelIds}`;
    const token = await amadeousTokenGenerator();
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.get(completeurl, config);
    res.status(200).json({
      success: true,
      data: response.data.data,
    });

  }catch(error){
    next(error);
  }
}

module.exports = {
  getHotelbyID,
  getHotelbyCity,
  getHotelByGeocode,
  getHotelratings
};
