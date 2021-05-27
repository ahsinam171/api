const mongoose = require("mongoose");
// user schema
const bookingSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      default: Math.floor(Math.random() * 100),
    },
    ground: {
      type: String,
      enum: ["1", "2"],
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    gameDay: {
      type: String,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        " Thursday",
        " Friday",
      ],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
