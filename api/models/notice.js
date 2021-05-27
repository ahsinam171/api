const mongoose = require('mongoose');
// user schema
const noticeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      default: Math.floor(Math.random() * 100)
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


module.exports = mongoose.model('Notice', noticeSchema);
