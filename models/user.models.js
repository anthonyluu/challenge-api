'use strict'

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	Id: String,
    githubID: String,
	name: String,
	email: String,
	challenges:[{type:mongoose.Schema.ObjectId, ref: 'Challenge'}],
    attempts:[{type:mongoose.Schema.ObjectId, ref: 'Attempt'}],
    active: Boolean
});

module.exports = mongoose.model('User', UserSchema);
