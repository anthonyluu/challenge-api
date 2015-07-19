
var Attempt = require('../models/attempt.models');

exports.createAttempt = function(req,res){
    var attempt = new Attempt();
    attempt.gitPullRequestID = req.body.gitID;
    attempt.status = req.body.status;
    attempt.title = req.body.title;
    attempt.challenge =req.body.challenge; //have to find how to store the object reference
   	attempt.individual = req.body.user;
	attempt.save(function(error){
        if(err) res.send(error);
        res.json({message: 'Attempt successfully created', data:user});
    });
}

exports.getAttempt = function(req, res){
    Attempt.find({gitPullRequestID:req.params.gitID},function(err, attempt) {
        if (err) res.send(err);
        res.json(attempt);
    });
}


exports.updateAttempt = function(req, res){
    User.find({gitPullRequestID:req.params.gitID}, function(err, attempt){
        if (err) res.send(err);
        
        attempt.save(function(err){
            if (err) res.send(err);
            res.json('successfully updated');
        });
    }
}

exports.deleteAttempt = function(req,res){
    Attempt.findByIdAndRemove(req.params.gitID,
        function(err){
            if(err) res.send(err);
            res.json({message:'Attempt is deleted'});
        });
}
