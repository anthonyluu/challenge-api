var User = require('../models/user.models');

exports.createUser = function(req,res){
    var user = new User();
    user.githubID = req.body.githubID;
    user.name = req.body.name;
    user.email = req.body.email;
    user.active = true;
    user.save(function(error){
        if(err) {
            res.send(error);
        }
        res.json({message: 'User successfully created', data:user});
    });
}

exports.getUser = function(req, res){
    User.find({githubID:req.params.id},
        function(err, user) {
            if (err){
                res.send(err);
            }
            if (!user.active){
                res.json({message:'User Does Not Exist'});
            }
            res.json(user);
        }
    );
}

exports.getAllUsers = function(req, res){
    User.find({}, function(err, users) {
        if(err){
            res.send(err);
        }
        var userMap = {};
        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        res.send(userMap);  
    });
}

exports.getUserAttempts = function(req,res){
    User.find({githubID:req.params.githubID},
        function(err, user)  { 
            if (err) {
                res.send(err);
            }
        }
    )
    .populate('attempts')
    .exec(function(err, user){
        if(err){
            res.send(err);
        }
        if(!user.active){
            res.send('User Does Not Exist');
        }
        res.json(user.attempts);
    });
}

exports.getUserChallenges = function(req,res){
    User.find({githubID:req.params.githubID},
        function(err, user)  { 
            if (err){
                 res.send(err);
            }
        }
    )
    .populate('challenges')
    .exec(function(err, user){
        if(err){
            res.send(err);
        }
        if(!user.active){
            res.send('User Does Not Exist');
        }
        res.json(user.challenges);
    });
}

/*

exports.addChallenge = function(req, res){
    User.find({githubID:req.params.githubID}, function(err, user){
        if (err) res.send(err);
        if(!user.active) res.send('User Does Not Exist');
        user.challenges
        
        user.save(function(err){
            if (err) res.send(err);
            res.json(user);
        });
    }
}*/


