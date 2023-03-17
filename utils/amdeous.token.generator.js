const axios = require("axios");
const qs = require("qs");

const generateToken = async () => {
  let access_token = "";

  // axios call to get token
  const url = `https://test.api.amadeus.com/v1/security/oauth2/token`;
  const data = qs.stringify({
    grant_type: "client_credentials",
    client_id: "MlGiRfduTh0h7cAjx59LSIWnX0yIHa6g",
    client_secret: "YQaezFRCB3HI0A1o",
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://test.api.amadeus.com/v1/security/oauth2/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      access_token = response.data.access_token;
    })
    .catch((error) => {
      console.log(error);
    });

  return access_token;
};

module.exports = generateToken;

