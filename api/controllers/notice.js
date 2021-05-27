const Notice = require('../models/notice');
exports.noticeController = (req, res) => {
    const {  subject, description} = req.body;
    const notice = new Notice({
        
        subject,
        description,
      });

      notice.save((err, notice) => {
        if (err) {
          console.log(err);
        //   console.log('Save error', errorHandler(err));
          return res.status(401).json({
            errors: errorHandler(err)
          });
        } else {
          return res.json({
            success: true,
            message: notice,
            message: 'Notice created success'
          });
        }
      });
};
// exports.getNoticeController = (req, res) => {
//     Notice.find()
//     .then(notice =>{
//         res.json(notice)
//     }).catch(err =>{
//         console.log(err)
//     })
// };

exports.getNoticeController = (req, res) => {
  Notice.find({})
  .exec()
  .then(notice =>{
      res.status(200).json(notice);
  })
  .catch(err =>{
    res.status(500).json({
      error:err
    });
     
  });
};