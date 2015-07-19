'use strict'

var mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({
	Id: String,
	gitIssueID: String,
	title: String,
	attempts: [{type: Mongoose.Schema.ObjectId, ref: 'Attempt'}],
	assigner: {type: Mongoose.Schema.ObjectId, ref:'User'},
	status: String,
	winningAttempt: {type: Mongoose.Schema.ObjectId, ref:'Attempt'},   
});

module.exports = mongoose.model('Challenge', challengeSchema);