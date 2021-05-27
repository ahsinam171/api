// const express = require('express')
// const router = express.Router()

// // Load Controllers
// const {
//     registerController,
//     activationController,
//     signinController,
//     forgotPasswordController,
//     resetPasswordController,
//     smsController,
// } = require('../controllers/auth.controller')

// const {noticeController, getNoticeController} = require('../controllers/notice.controller');
// const {tournamentController, getTournamentController} = require('../controllers/tournament.controller');
// const {feedbackController, getFeedbackController} = require('../controllers/feedback.controller');
// const {
//     validSign,
//     validLogin,
//     forgotPasswordValidator,
//     resetPasswordValidator
// } = require('../helpers/valid')

// router.post('/register',
//     validSign,
//     registerController)

// router.post('/login',
//     validLogin, signinController)

// router.post('/activation', activationController)

// // forgot reset password
// router.put('/forgotpassword', forgotPasswordValidator, forgotPasswordController);
// router.put('/resetpassword', resetPasswordValidator, resetPasswordController);

// // Google and Facebook Login
// // router.post('/googlelogin', googleController)
// // router.post('/facebooklogin', facebookController)
// router.post('/notice', noticeController);
// router.get('/notice', getNoticeController);
// router.post('/tournament', tournamentController);
// router.get('/tournament', getTournamentController);
// router.post('/feedback', feedbackController);
// router.get('/feedback', getFeedbackController);
// router.get('/sms', smsController);
// module.exports = router