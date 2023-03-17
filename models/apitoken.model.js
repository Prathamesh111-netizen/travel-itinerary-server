const mongoose = require("mongoose");

// store the refresh tokens in the db
const tokenSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    usage : {
      type : Number,
      default : 0
    },
    maxLimit : {
      type : Number,
      default : 1000
    }
  },
  { timestamps: true }
);

// delete the refresh tokens every 7 days
tokenSchema.index({ createdAt: 1 }, { expires: "7d" });

module.exports = mongoose.model("ApiToken", tokenSchema);
