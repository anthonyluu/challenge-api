
var Challenge = require('../models/challenge.models');

exports.createChallenge = function(req,res){
    var Challenge = new Challenge();
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
    Challenge.find({gitPullRequestID:req.params.gitID},function(err, challenge) {
        if (err) res.send(err);
        res.json(challenge);
        User.find({githubID:req.params.id}, function(err, user)  { if (err) res.send(err); })
            .populate('attempts')
            .exec(function(err, user){
                if(err) res.send(err);
                if(!user.active) res.send('User Does Not Exist');
                res.json(user.attempts);
            });
    });
}

exports.getChallenge = function(req,res) {
    Challenge.find({gitPullRequestID:req.params.issueId}, function(err, challenge) {
        if (err) res.send(err);
        res.json(challenge);
    });
}

exports.getAllChallenges = function(req, res){
    Challenge.find({}, function(err, challenges) {
        if(err) res.send(err);
        var challengeMap = {};
        challenges.forEach(function(challenge) {
            challengeMap[challenge._id] = challenge;
        });

        res.send(challengeMap);  
    });
}

exports.updateChallenge = function(req, res) {
    User.find({gitPullRequestID:req.params.gitID}, function(err, challenge) {
        if (err) res.send(err);

        challenge.save(function(err){
            if (err) res.send(err);
            res.json('successfully updated');
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