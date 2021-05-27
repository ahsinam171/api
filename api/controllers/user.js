const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { createTransporter, sendEmail } = require("../utils/nodemailer");

// const mailgun = require("mailgun-js");
// const DOMAIN = 'sandboxae62811302b345e7a22205927e8e79f7.mailgun.org';
// const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});

const { validationResult } = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.MAIL_KEY);

//Create new user for Sign Up
exports.signUpNewUser = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created sucessfully..!..",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }

      const token = jwt.sign(
        { firstName, lastName, email, password },
        process.env.JWT_ACC_ACTIVATE,
        { expiresIn: "1y" }
      );

      // const data = {
      //     from: 'noreply@gmail.com',
      //     to: email,
      //     subject: 'Account Activation Link',
      //     html:`
      //     <h2>Please click on given link to activate your account</h2>
      //     <p>${process.env.CLIENT_URL}/authentication/
      //     `
      // };
      mg.messages().send(data, function (error, body) {
        console.log(body);
      });
    });
};

//User Login
exports.userSignIn = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "Auth Failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(404).json({
            message: "Auth Failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1y",
            }
          );
          return res.status(200).json({
            message: "Auth sucessful...",
            token: token,
          });
        }
        res.status(404).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//Delete User
exports.deleteUser = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// //forgotPassword
// exports.forgotPassword = (req, res) => {
//     const {email} = req.body;

//     User.findOne({email}, (err,user) =>{
//         if(err || !user){
//             return res.status(409).json({
//                 message: 'User with this email does not exists'
//             });
//         }

//         const token = jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '1y'});
//         const data = {
//             from: 'noreply@futsalsolution.com',
//             to: email,
//             subject: 'Account Activation Link',
//             html:`
//                 <h2>Please click on the given link to reset your pasword</h2>
//                 <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
//             `
//         };

//         return user.updateOne({resetLink: token}, function (err, success){
//             if(err){
//                 return res.status(409).json({
//                     message: 'reset password link error'
//                 });
//             }
//             else{
//                 mg.messages().send(data, function (error, body){
//                     if(error){
//                         return res.json({
//                             error: err.message
//                         })
//                     }
//                     return res.json({message: 'Email has been sent, follow the instructions'});
//                 }) ;

//             }

//         })

//     })

// }
// exports.forgotPasswordController = (req, res) => {
//     const { email } = req.body;
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       const firstError = errors.array().map(error => error.msg)[0];
//       return res.status(422).json({
//         errors: firstError
//       });
//     } else {
//       User.findOne(
//         {
//           email
//         },
//         (err, user) => {
//           if (err || !user) {
//             return res.status(400).json({
//               error: 'User with that email does not exist'
//             });
//           }

//           const token = jwt.sign(
//             {
//               _id: user._id
//             },
//             process.env.JWT_RESET_PASSWORD,
//             {
//               expiresIn: '20m'
//             }
//           );

//           const emailData = {
//             from: process.env.EMAIL_FROM,
//             to: email,
//             subject: `Password Reset link`,
//             html: `
//                       <h1>Please use the following link to reset your password</h1>
//                       <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
//                       <hr />
//                       <p>This email may contain sensetive information</p>
//                       <p>${process.env.CLIENT_URL}</p>
//                   `
//           };

//           return user.updateOne(
//             {
//               resetPasswordLink: token
//             },
//             (err, success) => {
//               if (err) {
//                 console.log('RESET PASSWORD LINK ERROR', err);
//                 return res.status(400).json({
//                   error:
//                     'Database connection error on user password forgot request'
//                 });
//               } else {
//                 sgMail
//                   .send(emailData)
//                   .then(sent => {
//                     // console.log('SIGNUP EMAIL SENT', sent)
//                     return res.json({
//                       message: `Email has been sent to ${email}. Follow the instruction to activate your account`
//                     });
//                   })
//                   .catch(err => {
//                     // console.log('SIGNUP EMAIL SENT ERROR', err)
//                     return res.json({
//                       message: err.message
//                     });
//                   });
//               }
//             }
//           );
//         }
//       );
//     }
//   };

//   exports.resetPasswordController = (req, res) => {
//     const { resetPasswordLink, newPassword } = req.body;

//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       const firstError = errors.array().map(error => error.msg)[0];
//       return res.status(422).json({
//         errors: firstError
//       });
//     } else {
//       if (resetPasswordLink) {
//         jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(
//           err,
//           decoded
//         ) {
//           if (err) {
//             return res.status(400).json({
//               error: 'Expired link. Try again'
//             });
//           }

//           User.findOne(
//             {
//               resetPasswordLink
//             },
//             (err, user) => {
//               if (err || !user) {
//                 return res.status(400).json({
//                   error: 'Something went wrong. Try later'
//                 });
//               }

//               const updatedFields = {
//                 password: newPassword,
//                 resetPasswordLink: ''
//               };

//               user = _.extend(user, updatedFields);

//               user.save((err, result) => {
//                 if (err) {
//                   return res.status(400).json({
//                     error: 'Error resetting user password'
//                   });
//                 }
//                 res.json({
//                   message: `Great! Now you can login with your new password`
//                 });
//               });
//             }
//           );
//         });
//       }
//     }
//   };

exports.resetPasswordToken = async (req, res) => {
  try {
    const token = Math.random().toFixed(6) * 1000000;
    if (!token) throw "Unable to generate token";
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw "Unable to find account with the entered email. ";

    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;

    await user.save();

    await sendEmail({
      to: req.body.email,
      from: process.env.EMAIL,
      subject: "Password reset",
      html: `
            <p> You requested Password reset</p>
            <p> Your code for password reset is: ${token} </p>
            `,
    });
    res.send("Mail Sent");
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.setNewPassword = async (req, res) => {
  try {
    const newPassword = req.body.password;
    const passwordToken = req.body.passwordToken;
    let resetUser;

    const user = await User.findOne({
      resetToken: req.body.passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) throw "Invalid token";

    resetUser = user;
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    resetUser.password = hashedPassword;
    resetUser.resetToken = null;
    resetUser.resetTokenExpiration = undefined;

    await resetUser.save();
    res.send("Password changed");
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
