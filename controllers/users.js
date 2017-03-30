mongoose = require('mongoose');
require('../models/user')();

var User = mongoose.model('User');

// POST /api/users
exports.postUsers = function(req,res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.poop = "poop";
    hash = User.hashPassword(req.body.password);
    console.log(hash);
    user.hashed_password = hash;

    user.save(function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'User created!' });
    });
        
};

// GET /api/users
exports.getUsers = function(req,res) {
     User.find(function(err, users) {
        if (err)
            res.json(err);
        else
            res.json(users);
    });
};

// GET /api/user/:user_id
exports.getUser = function(req,res) {
    User.findById(req.params.user_id, function(err,user) {
        if (err)
            res.json(err);
        res.json(user);
    });

};

// PUT /api/user/:user_id
exports.putUser = function(req,res) {
    User.findOneAndUpdate(req.params.user_id, {
        name: req.body.name,
        email: req.body.email,
        hashed_password: User.hashPassword(req.body.password),
        
 
    }, function(err, user) {
        if (err)
            res.json(err);
        res.json(user);
    });

};

// DELETE /api/user/:user_id
exports.deleteUser = function(req,res) {
    User.findOneAndRemove(req.params.user_id, function(err){
        if (err)
            res.json(err);
    });
    
};
