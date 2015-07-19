
var Challenge = require('../models/challenge.models');

exports.createchallenge = function(req,res){
    var challenge = new Challenge();
    
    challenge.gitIssueID = req.body.gitID;
    challenge.status = req.body.status;
    challenge.title = req.body.title;
   	challenge.assigner = req.body.user;
	challenge.save(function(error){
        if(err) res.send(error);
        res.json({message: 'challenge successfully created', data:challenge});
    });
}

exports.getAttempts = function(req, res){
    Challenge.find({gitPullRequestID:req.params.gitID},function(err, challenge) {
        if (err) res.send(err);
        res.json(challenge);
        User.find({githubID:req.params.id},
        function(err, user)  { if (err) res.send(err);})
    .populate('attempts')
    .exec(function(err, user){
        if(err) res.send(err);
        if(!user.active) res.send('User Does Not Exist');
        res.json(user.attempts);
    });
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

exports.updatechallenge = function(req, res){
    User.find({gitPullRequestID:req.params.gitID}, function(err, challenge){
        if (err) res.send(err);
        
        challenge.save(function(err){
            if (err) res.send(err);
            res.json('successfully updated');
        });
    }
}

exports.deletechallenge = function(req,res){
    challenge.findByIdAndRemove(req.params.gitID,
        function(err){
            if(err) res.send(err);
            res.json({message:'challenge is deleted'});
        });
}
