const axios = require("axios");

const config = {
  headers: {
    apikey: process.env.CURRENCY_API_KEY,
  },
};

const getLiveConversionRate = async (req, res, next) => {
  try {
    // curl --request GET 'https://api.apilayer.com/exchangerates_data/live?base=USD&symbols=EUR,GBP' \
    // --header 'apikey: YOUR API KEY'

    const { base, to } = req.params;
    console.log(base, to);

    const url = `${process.env.CURRENCY_API_HOST}/latest?base=${base}&symbols=${to}`;

    const response = await axios.get(url, config);
    const data = response.data;
    res.json({
      success: true,
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCurrencies = async (req, res, next) => {
  try {
    const url = `${process.env.CURRENCY_API_HOST}/symbols`;
    const response = await axios.get(url, config);

    const data = response.data;
    res.json({
      success: true,
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getLiveConversionRate, getAllCurrencies };
