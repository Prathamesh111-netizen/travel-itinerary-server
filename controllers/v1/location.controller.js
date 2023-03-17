const axios = require("axios");
const amadeousTokenGenerator = require("../../utils/amdeous.token.generator");
const url = process.env.AMADEUS_API_HOST;

const getLocationScore = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      throw new Error("Latitude and Longitude are required");
    }
    const completeurl = `${url}/location/analytics/category-rated-areas?latitude=${latitude}&longitude=${longitude}`;

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

    res.status(200).json(response.data);
  } catch (err) {
    next(err);
  }
};

const getShoppingActivities = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      throw new Error("Latitude and Longitude are required");
    }

    let { radius } = req.query;
    radius = radius || 1;

    const completeurl = `${url}/shopping/activities?latitude=${latitude}&longitude=${longitude}&radius=${radius}`;

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

    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};

const getShoppingActivityByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("ID is required");
    }

    const completeurl = `${url}/shopping/activities/${id}`;
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
    next(err);
  }
};

const getLocationPOI = async (req, res, next) => {
  try {
    const options = ["SIGHTS", "NIGHTLIFE", "RESTAURANT", "SHOPPING"];
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      throw new Error("Latitude and Longitude are required");
    }

    let { radius, categories } = req.query;
    radius = radius || 1;
    categories = categories || options.join(",");

    let query = `?latitude=${latitude}&longitude=${longitude}&radius=${radius}&categories=${categories}`;
    const completeurl = `${url}/reference-data/locations/pois${query}`;

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

const getLocationPOIByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("ID is required");
    }

    const completeurl = `${url}/reference-data/locations/pois/${id}`;
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
    next(err);
  }
};

module.exports = {
  getLocationScore,
  getShoppingActivities,
  getShoppingActivityByID,
  getLocationPOI,
  getLocationPOIByID,
};
