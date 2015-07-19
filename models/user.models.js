'use strict'

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	Id: String,
    githubID: String,
	name: String,
	email: String,
	challenges:[String],
    attempts:[String],
    active: Boolean
});

module.exports = mongoose.model('User', UserSchema);
