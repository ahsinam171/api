const mongoose = require('mongoose');
// user schema
const tournamentSchema = new mongoose.Schema(
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
    tournamentName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    courtType: {
        type: String,
        required: true,
    },
    organizer: {
        type: String,
        required: true,
    },
    registrationCost: {
        type: String,
        required: true,
    },
    playerNo: {
        type: String,
        required: true,
    },

    
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model('Tournament', tournamentSchema);
