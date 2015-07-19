'use strict'

var mongoose = require('mongoose');

var attemptSchema = new mongoose.Schema({
	Id: String,
	gitPullRequestID: String,
	status: String,
	title: String,
	challenge: String ,
	individual: String,
	active: Boolean
});

module.exports = mongoose.model('Attempt', attemptSchema);
