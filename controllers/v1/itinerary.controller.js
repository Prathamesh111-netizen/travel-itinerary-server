const openai = require("../../config/gpt");

const getResult = async (req, res, next) => {
  try {
    let {
      accomodationType,
      budget,
      destination,
      language,
      transportationType,
      tripDuration,
      interests,
      cuisineType,
      activityType,
      count,
    } = req.body;

    // optional parameters
    // from start date to end date

    accomodationType = req.body.accomodationType || "any type";
    budget = req.body.budget || "any budget";
    destination = req.body.destination || "Any where on the world";
    language = req.body.language || "English";
    transportationType = req.body.transportationType || "any means";
    tripDuration = req.body.tripDuration || "any duration";
    interests = req.body.interests || "any interest";
    cuisineType = req.body.cuisineType || "any cuisine";
    activityType = req.body.activityType || " any activity";
    count = req.body.count || 1;

    const prompt = `I want to go to ${destination} for ${tripDuration} days. I want to stay in a ${accomodationType} and spend around ${budget} per day. I want to travel by ${transportationType} and speak ${language}. I want to eat ${cuisineType} food. I want to do ${activityType} and visit ${interests}. Suggest ${count} itineraries for the same, return the result in only the following json format:{Itinerary ${count} :{ }}. Give complete details for each day.`;

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

    // resultArray.shift();
    // convert string to object
    console.log(cleanedResult);
    const spiltedResult = cleanedResult.split("Itinerary");
    spiltedResult.shift();

    const finalResult = {
      Itinerary: {
        accomodationType,
        budget,
        destination,
        language,
        transportationType,
        tripDuration,
        interests,
        cuisineType,
        activityType,
        count,
      },
      result: [],
    };

    let i = 1;
    spiltedResult.forEach((element) => {
      // remove / character from string
      // remove " character from string
      element = element.replace(/"/g, "");
      element = element.replace(/\//g, "");
      let itinerary = element.split("Day");
      itinerary.shift();
      for (let index = 0; index < itinerary.length; index++) {
        itinerary[index] = "Day " + itinerary[index];
      }



      if (itinerary.length > 1) {
        finalResult.result.push({
          Itinerary: i,
          DaywiseItinerary: itinerary,
        });
        i++;
      }
    });

    res.status(200).send({
      success: true,
      data: finalResult,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getResult };
