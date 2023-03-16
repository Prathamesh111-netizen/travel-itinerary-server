const openai = require("../config/gpt");

const getGPT = async (req, res, next) => {
  try {
    // const { prompt } = req.body || "What is the meaning of life?";
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "What is the meaning of life?",
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
      console.log(response);
    res.status(200).send(response.data);
  } catch (err) {
    next(err);
  }
};

module.exports = { getGPT };
