'use strict'

var mongoose = require('mongoose');

var attemptSchema = new mongoose.Schema({
	Id: String,
	gitPullRequestID: String,
	status: String,
	title: String,
	challenge: {type: mongoose.Schema.ObjectId, 'ref': 'Challenge'},
	individual: {type: mongoose.Schema.ObjectId, 'ref':'User'},
	active: Boolean
});

module.exports = mongoose.model('Attempt', attemptSchema);
