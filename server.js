require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const Database = require("./config/db");

const { notFound, errorHandler } = require("./middleware");

// routes
const {
  userRouter,
  itineraryRouter,
  commuteRouter,
  currencyRouter,
  accomodationRouter,
  locationRouter,
  tokenRouter,
} = require("./routes/v1/index.js");

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json({ limit: "5mb" })); // middleware to use req.body
app.use(cors()); // to avoid CORS errors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/itinerary", itineraryRouter);
app.use("/api/v1/commute", commuteRouter);
app.use("/api/v1/currency", currencyRouter);
app.use("/api/v1/accomodation", accomodationRouter);
app.use("/api/v1/location", locationRouter);
app.use("/api/v1/token", tokenRouter);

app.get("/", (req, res) => {
  res.json({ status: `OK at ${new Date()}` });
});

// middleware to act as fallback for all 404 errors
app.use(notFound);

// configure a custome error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
