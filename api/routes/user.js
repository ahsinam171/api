const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const userController = require("../controllers/user");
// const deleteTournament = require('../controllers/tournament');

const Admin = require("../models/admin");
const adminController = require("../controllers/admin");
// const {forgotPasswordController, resetPasswordController}=require('../controllers/user')

const {
  noticeController,
  getNoticeController,
} = require("../controllers/notice");
const {
  feedbackController,
  getFeedbackController,
} = require("../controllers/feedback");
const {
  tournamentController,
  getTournamentController,
  deleteTournament,
} = require("../controllers/tournament");
const notice = require("../models/notice");
const {
  bookingController,
  getBookingController,
} = require("../controllers/booking");

const BookGround = require("../controllers/booking");
// const {
//     forgotPasswordValidator,
//     resetPasswordValidator
// } = require('../helpers/valid')

//Sign up URL
router.post("/signup", userController.signUpNewUser);

//Sign in url
router.post("/signin", userController.userSignIn);

//Sign up URL
router.post("/adminsignup", adminController.signUpNewAdmin);

//Sign in url
router.post("/adminsignin", adminController.adminSignIn);

//Get users
router.get("/", (require, response, next) => {
  User.find()
    .then((result) => {
      response.status(200).json({
        UserDatas: result,
      });
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({
        error: err,
      });
    });
});

//Get
router.get("/getadmin", (require, response, next) => {
  Admin.find()
    .then((result) => {
      response.status(200).json({
        AdminDatas: result,
      });
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
});

// // forgot reset password
// router.put('/forgotpassword', forgotPasswordValidator, forgotPasswordController);
// router.put('/resetpassword', resetPasswordValidator, resetPasswordController);

//Delete User
router.delete("/:userId", userController.deleteUser);

//Delete Tournament

// //forgot Password
// router.put('/forgot-password', userController.forgotPassword);

//Tournaments
router.post("/tournament", tournamentController);
router.get("/tournament", getTournamentController);
router.delete("/tournament/:userId", deleteTournament);

//Feedback
router.post("/feedback", feedbackController);
router.get("/feedback", getFeedbackController);

//Futsal Notices and Offers
router.post("/notice", noticeController);
router.get("/notice", getNoticeController);
// //Get
// router.get('/getnotice', (require , response , next )=>{
//     notice.find()
//     .then(result=>{
//         response.status(200).json({
//             NoticeDatas:result
//         });
//     })
//     .catch(err=>{
//         console.log(err);
//         response.status(500).json({
//             error:err
//         })
//     });
// })

//Booking
// router.post("/booking", bookingController);
router.get("/booking", getBookingController);
router.post("/bookground", BookGround.bookGround);
router.get("/sendtime", BookGround.sendTime);
router.post("/passwordResetToken", userController.resetPasswordToken);

router.post("/new-password", userController.setNewPassword);

module.exports = router;
