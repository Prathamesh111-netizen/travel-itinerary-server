const commuteRouter = require("./commute.route");
const currencyRouter = require("./currency.route");
const itineraryRouter = require("./itinerary.route");
const userRouter = require("./user.route");
const accomodationRouter = require("./accomodation.route");
const locationRouter = require("./location.route");
const tokenRouter = require("./token.route");

module.exports = {
  commuteRouter,
  currencyRouter,
  itineraryRouter,
  userRouter,
  accomodationRouter,
  locationRouter, 
  tokenRouter
};
