const { v4: uuidv4 } = require("uuid");
const { Users, ApiToken, AccessToken } = require("../../config/db");

const getAPItoken = async (req, res, next) => {
  try {
    const { user } = req;
    const apiToken = await ApiToken.findOne({ email: user.email });
    if (apiToken) {
      res.status(200).json({ success: true, apiToken: apiToken.token });
    } else {
      //   throw new Error("No API token found");
      const newToken = await ApiToken.create({
        email: user.email,
        token: uuidv4(),
      });
      res.status(200).json({ success: true, apiToken: newToken.token });
    }
  } catch (error) {
    next(error);
  }
};

const deleteAPItoken = async (req, res, next) => {
  try {
    const { user } = req;
    await ApiToken.findOneAndDelete({ email: user.email }).then((result) => {
      if (result) {
        res.status(200).json({ success: true, message: "API token deleted" });

        ApiToken.create({
          email: user.email,
          token: uuidv4(),
        });
      } else {
        throw new Error("No API token found");
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAPItoken,
  deleteAPItoken,
};
