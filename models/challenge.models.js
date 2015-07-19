'use strict'

var mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({
	Id: String,
	gitIssueID: String,
	gitIssueURL: String,
	title: String,
	description: String,
	attempts: [String],
	assigner: String,
	status: String,
	winningAttempt: String,
	active: Boolean  
});

module.exports = mongoose.model('Challenge', challengeSchema);
