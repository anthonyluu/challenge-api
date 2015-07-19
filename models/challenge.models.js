'use strict'

var mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({
	Id: String,
	gitIssueID: String,
	gitIssueURL: String,
	title: String,
	description: String,
	attempts: [{type: mongoose.Schema.ObjectId, ref: 'Attempt'}],
	assigner: {type: mongoose.Schema.ObjectId, ref:'User'},
	status: String,
	winningAttempt: {type: mongoose.Schema.ObjectId, ref:'Attempt'},   
});

module.exports = mongoose.model('Challenge', challengeSchema);