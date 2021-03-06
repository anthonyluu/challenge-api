var Challenge = require('../models/challenge.models');
var Attempts = require('../models/attempt.models')

exports.createChallenge = function(req,res){
    var challenge = new Challenge();

    challenge.gitIssueID = req.payload.gitID;
    challenge.gitIssueURL = req.payload.gitURL;
    challenge.status = "ongoing";
    challenge.title = req.payload.title;
    challenge.description = req.payload.description;
    challenge.attempts = []; //have to find how to store the object reference
   	challenge.assigner = req.payload.user;
    
	challenge.save(function(err){
        console.log(err);
        // if(err) res.send(err);
        //res.json({message: 'challenge successfully created', data:challenge});
    });
}

exports.getAttempts = function(req, res){
    Challenge.findOne({gitPullRequestID:req.query.gitID},function(err, challenge) {
        if (err) res.send(err);
        //with challenge response
        if(challenge.attempts){
            var attemptList = {};
            challenge.attempts.forEach(function(attemptID){
                Attempts.findById(attemptID, function(err,attemptObject){
                    attemptList[attemptID] = attemptObject;
                });
            });
            res.json(attemptList);
        }
        res.send('No Attempts for Challenge');
        
    });
}

exports.getChallenge = function(request,reply) {
    Challenge.findOne({gitIssueID: request.params.issueId}, function(err, challenge) {
        reply(challenge);
    });
}

exports.getAllChallenges = function(request, reply){
    Challenge.find({}, function(err, challenges) {
        console.log(challenges);
        reply(challenges);  
    });
}

exports.updateChallenge = function(req, res) {
    User.find({gitPullRequestID:req.payload.gitID}, function(err, challenge) {
        if (err){
            res.send(err);
        }

        challenge.save(function(err){
            if (err){
                res.send(err);
            }
            res.send('successfully updated');
        });
    });
}



exports.deleteChallenge = function(req,res){
    Challenge.findByIdAndRemove(req.params.gitID,
        function(err){
            if(err) res.send(err);
            res.json({message:'challenge is deleted'});
        });
}
