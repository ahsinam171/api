const Booking = require("../models/booking");
const User = require("../models/user");

exports.bookingController = (req, res) => {
  const { ground, time, user } = req.body;
  const booking = new Booking({
    ground,
    time,
    user,
  });

  booking.save((err, booking) => {
    if (err) {
      console.log(err);
      //   console.log('Save error', errorHandler(err));
      return res.status(401).json({
        errors: errorHandler(err),
      });
    } else {
      return res.json({
        success: true,
        message: booking,
        message: "Booking done success",
      });
    }
  });
};
exports.getBookingController = (req, res) => {
  Booking.find()
    .then((booking) => {
      res.json(booking);
    })
    .catch((err) => {
      console.log(err);
    });
};

const timeSlot = [
  { label: "7-9:30", value: "Seven to Nine-Thirty" },
  { label: "10-11:30", value: "Ten to Eleven-Thirty" },
  { label: "12-1:30", value: "Twelve to One-Thirty" },
  { label: "2-3:30", value: "Two to Three-Thirty" },
  { label: "4-5:30", value: "Four to Five-Thirty" },
  { label: "6-7:30", value: "Six to Seven-Thirty" },
];

exports.sendTime = async (req, res) => {
  try {
    res.json(timeSlot);
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

exports.bookGround = async (req, res) => {
  try {
    const { ground, time, user, gameDay } = req.body;
    if (!ground || !time || !user || !gameDay)
      throw "Body was not sent properly";
    const booking = await Booking.findOne({
      time: time,
      gameDay: gameDay,
      ground: ground,
    });
    if (booking) throw "Booking for this ground is  already done on this time ";
    newBooking = new Booking({
      ground,
      time,
      user,
      gameDay,
    });
    await newBooking.save();
    res.status(201).json({ message: "Booking completed" });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
};
