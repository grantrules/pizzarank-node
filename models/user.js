var mongoose = require('mongoose');
var crypto = require('crypto');
var config = require('../config');

module.exports = function() {
    var userSchema = new mongoose.Schema({
        name: String,
        email: {
            type: String,
            required: true,
            index: {
              unique: true,
              sparse: true
            }
        },
        hashed_password: String,
        role: String,
        date_added: Date,    
    });

    userSchema.statics.hashPassword = function(password,callback) {
        hash = crypto.createHash('sha256').update(password + config.secret)
            .digest('base64').toString();
        //if callback
        //    callback(hash);
        return hash;

    }
    
    userSchema.statics.ROLES = {
        user: "user",
        admin: "admin",
        superuser: "superuser",
        deactivated: "deactivated",
    };
    mongoose.model('User', userSchema);
}