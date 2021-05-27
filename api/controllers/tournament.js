const tournament = require('../models/tournament');
const Tournament = require('../models/tournament');
exports.tournamentController = (req, res) => {
    const { user, tournamentName, startDate, endDate, courtType, organizer, registrationCost, playerNo} = req.body;
    const tournament = new Tournament({
        user,
        tournamentName,
        startDate,
        endDate,
        courtType,
        organizer,
        registrationCost,
        playerNo
      });

      tournament.save((err, notice) => {
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
            message: 'Tournament created success'
          });
        }
      });
};
exports.getTournamentController = (req, res) => {
    Tournament.find({})
    .exec()
    .then(tournament =>{
        res.status(200).json(tournament);
    })
    .catch(err =>{
      res.status(500).json({
        error:err
      });
       
    });
};

//Delete Tournament
exports.deleteTournament = (req, res, next)=>{
  Tournament.remove({_id: req.params.userId})
  .exec()
  .then(tournament=>{
      console.log(tournament);
      res.status(200).json({
          message: 'Tournament deleted'
      });
  })
  .catch(err =>{
      console.log(err);
      res.status(500).json({
          error: err
      });
  });
  
}

