const Feedback = require('../models/feedback');
exports.feedbackController = (req, res) => {
    const { user, subject, description} = req.body;
    const feedback = new Feedback({
        user,
        subject,
        description,
      });

      feedback.save((err, feedback) => {
        if (err) {
          console.log(err);
        //   console.log('Save error', errorHandler(err));
          return res.status(401).json({
            errors: errorHandler(err)
          });
        } else {
          return res.json({
            success: true,
            message: feedback,
            message: 'Feedback submitted'
          });
        }
      });
};
exports.getFeedbackController = (req, res) => {
    Feedback.find()
    .then(feedback =>{
        res.json(feedback)
    }).catch(err =>{
        console.log(err)
    })
};