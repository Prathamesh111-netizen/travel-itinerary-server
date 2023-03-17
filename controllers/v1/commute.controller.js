const axios = require("axios");
var convert = require('xml-js');

const getFlights = async (req, res, next) => {
  try {
    const { from, date, to } = req.params;

    const options = {
      method: "GET",
      //   url: `https://${process.env.RAPIDAPI_FLIGHT_HOST}/TIMETABLE/${from}/${to}/${date}`,
      url: "https://timetable-lookup.p.rapidapi.com/TimeTable/BOS/LAX/20231217/",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_FLIGHT_KEY,
        "X-RapidAPI-Host": process.env.RAPIDAPI_FLIGHT_HOST,
      },
    };

    axios.request(options).then(function (response) {
    //   const flights = response.data;
      // xml to json
          const flights = JSON.parse(convert.xml2json(response.data));
      res.json({
        success: true,
        data: flights,
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFlights };
