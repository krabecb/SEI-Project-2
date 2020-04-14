const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')

//ROUTES
router.get('/', (req, res) => {
	const reqUsername = req.session.username
	const firstName = req.session.firstName 
	const lastName = req.session.lastName
	const dateOfBirth = req.session.dateOfBirth
	const hometown = req.session.hometown
	const email = req.session.email
	console.log(req.session);
	res.render('user/show.ejs', {
		firstName: firstName,
		lastName: lastName,
		dateOfBirth: dateOfBirth,
		hometown: hometown,
		email: email,
		reqUsername: reqUsername
	})
})

module.exports = router