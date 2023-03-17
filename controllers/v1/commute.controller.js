const axios = require("axios");
const openai = require("../../config/gpt");
var convert = require("xml-js");

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

const getBuses = async (req, res, next) => {
  try {

    const { from, to, date, time, budget } = req.query;
    console.log(req.query);
    const prompt = `I want to go from ${from} to ${to} on ${date} at ${time}. Suggest me the best bus route and the fare in the following format: {Bus Route: ${from} to ${to}, Fare: ${budget}}. Give complete details for each day.`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const result = response.data.choices[0].text;
    let cleanedResult = result.replace(/Itinerary/g, '"Itinerary');

    // replace new line character with space
    cleanedResult = result.replace(/(\r\n|\n|\r)/gm, " ");
    // remove extra spaces
    cleanedResult = cleanedResult.replace(/\s+/g, " ");

    //remove brackets
    cleanedResult = cleanedResult.replace(/[\[\]\{\}']+/g, "");

   
    res.json({
      success: true,
      data: cleanedResult,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFlights, getBuses };
