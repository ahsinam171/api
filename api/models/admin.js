const mongoose = require('mongoose');
const crypto = require('crypto');

const adminSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName: {type:String, require:true},
    lastName: {type:String, require:true},
    role: {
              type: String,
              default: 'Admin'
            },
    email:{
        type: String,
        require: true,
        unique: true,
        match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    },
    password:{type:String, require:true},
},
    {
        timestamps: true
    },
    
    // resetLink:{
    //     data: String,
    //     default: ''
    // }
);
module.exports = mongoose.model('Admin', adminSchema);

// const mongoose = require('mongoose');
// const crypto = require('crypto');
// // user schema
// const adminScheama = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       trim: true,
//       required: true
//     },
//     email: {
//       type: String,
//       trim: true,
//       required: true,
//       unique: true,
//       lowercase: true
//     },
//     hashed_password: {
//       type: String,
//       required: true
//     },
//     address: {
//       type: String,
//       required: true
//     },
//     address: {
//       type: String,
//       required: true
//     },
//     role: {
//       type: String,
//       default: 'Admin'
//     },
//     phone: {
//       type: String,
//       required: true
//     },
//     resetPasswordLink: {
//       data: String,
//       default: ''
//     }
//   },
//   {
//     timestamps: true
//   }
// );


// module.exports = mongoose.model('Admin', adminScheama);
