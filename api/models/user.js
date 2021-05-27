const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: {
      type: String,
      require: true,
      unique: true,
      match:
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    },
    password: { type: String, require: true },
    resetLink: {
      data: String,
      default: "",
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Booking"
    },
  },
  {
    timestamps: true,
  }
);

// // virtual
// userSchema
//   .virtual('password')
//   .set(function(password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function() {
//     return this._password;
//   });

// // methods
// userSchema.methods = {
//   authenticate: function(plainText) {
//     return this.encryptPassword(plainText) === this.hashed_password;
//   },

//   encryptPassword: function(password) {
//     if (!password) return '';
//     try {
//       return crypto
//         .createHmac('sha1', this.salt)
//         .update(password)
//         .digest('hex');
//     } catch (err) {
//       return '';
//     }
//   },

//   makeSalt: function() {
//     return Math.round(new Date().valueOf() * Math.random()) + '';
//   }
// };

module.exports = mongoose.model('User', userSchema);