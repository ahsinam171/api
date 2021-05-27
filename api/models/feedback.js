const mongoose = require('mongoose');
// user schema
const feedbackSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      default: Math.floor(Math.random() * 100)
    },
    user: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model('Feedback', feedbackSchema);
