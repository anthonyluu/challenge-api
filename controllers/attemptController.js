
var User = require('../models/user.models');

exports.createUser = function(req,res){
    var user = new User();
    user.Id = Math.random().toString(36).slice(2);
    user.name = req.body.name;
    user.email = req.body.email;
    user.challenges = [];
    user.attempts =[];
    
    user.save(function(error){
        if(err) res.send(error);
        res.json({message: 'User successfully created', data:user});
    });
}

exports.getAttempt = function(req, res){
    User.find(githubID{:req.params.id},function(err, user) {
        if (err) res.send(err);
        res.json(user);
    });
}


exports.updateAttempt = function(req, res){
    User.find({Id:req.params.Id}, function(err, user){
        if (err) res.send(err);
        user.
        user.save(function(err){
            if (err) res.send(err);
            res.json(user);
        });
    }
}

exports.deleteAttempt = function(req,res){
    User.findByIdAndRemove(req.params.id,
        function(err){
            if(err) res.send(err);
            res.json({message:'Attemp is deleted'});
        });
}
