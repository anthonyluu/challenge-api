'use strict'

var mongoose = require('mongoose');

var attemptSchema = new mongoose.Schema({
	Id: String,
	gitPullRequestID: String,
	status: String,
	title: String,
	challenge: {type: Mongoose.Schema.ObjectId, 'ref': 'Challenge'},
	individual: {type: Mongoose.Schema.ObjectId, 'ref':'User'},
});

module.exports = mongoose.model('Attempt', attemptSchema);
