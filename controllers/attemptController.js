
var Attempt = require('./models/attempt.models');

exports.createAttempt = function(req,res){
    var attempt = new Attempt();

    attempt.gitPullRequestID = req.payload.gitID;
    attempt.status = req.payload.status;
    attempt.title = req.payload.title;
    attempt.challenge =req.payload.challenge; 
   	attempt.individual = req.payload.user;

	attempt.save(function(error){
        if(err) {
            res.send(error);
        }
        res.json({message: 'Attempt successfully created', data:attempt});
    });
}

exports.getAttempt = function(req, res){
    Attempt.find({gitPullRequestID : req.query.gitID},
        function(err, attempt) {
            if (err){
                 res.send(err);
            }
            res.json(attempt);
        }
    );
}


exports.updateAttempt = function(req, res){
    User.find({gitPullRequestID:req.payload.gitID}, 
        function(err, attempt){
            if (err){
                 res.send(err);
            }
            attempt.save(function(err){
                if (err){
                     res.send(err);
                }
                res.json('successfully updated');
            });
        }
    );
    
}

exports.deleteAttempt = function(req,res){
    Attempt.findByIdAndRemove(req.params.gitID,
        function(err){
            if(err){
                res.send(err);
            }
            res.json({message:'Attempt is deleted'});
        });
}
