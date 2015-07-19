'use strict'

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	Id: String,
	name: String,
	email: String,
	challenges:[{type:Mongoose.Schema.ObjectId, ref: 'Challenge'}],
    attempts:[{type:Mongoose.Schema.ObjectId, ref: 'Attempt'}]
});

module.exports = mongoose.model('User', UserSchema);
