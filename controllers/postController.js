const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')

//ROUTES
router.get('/', async (req, res, next) => {
	try {
		const foundPosts = await Post.find().populate('user')
		console.log(foundPosts)
		res.render('posts/index.ejs', {
			posts: foundPosts,
			userId: req.session.userId
		})
	} catch(error) {
		next(error)
	}
})

//NEW -- !!!ADD LIB AND REQUIREAUTH!!!
router.get('/new', (req, res) => {
	res.render('posts/new.ejs', {
		userId: req.session.userId
	})
})

//SHOW -- GET
router.get('/:id', async (req, res, next) => {
	try {
		const foundPost = await Post.findById(req.params.id).populate('user')
		console.log(foundPost)
		console.log(foundPost.user.username)
		res.render('posts/show.ejs', {
			post: foundPost,
			user: req.session.username
		})	
	} catch(err) {
		next(err)
	}
})


//NEW -- POST
router.post('/', async (req, res, next) => {
	try {
		const postToCreate = {
			title: req.body.title,
			city: req.body.city,
			country: req.body.country,
			postDescription: req.body.description,
			postPicture: req.body.postPicture,
			user: req.session.userId
		}
		console.log('Here is req.session:')
		console.log(req.session)

		const createdPost = await Post.create(postToCreate)
		req.session.message = `${createdPost.title} successfully added!`
		res.redirect('/posts') //Maybe later redcirect to show?? 

	} catch(error) {
		next(error)
	}
})

// UPDATE -- PUT
router.put('/:id', async (req, res, next) => {
	try {
		const updatedPost = await Post.findByIdAndUpdate(
			req.params.id,
			req.body,
			{new: true}
			)
		console.log('it suppose to update');
		res.redirect(`/posts/${updatedPost._id}`)
	} catch(err) {
		next(err)
	}
}) 

// DELETE
router.delete('/:id', async (req, res, next) => {
	try {
		await Post.findByIdAndRemove(req.params.id)
		res.redirect('/posts')
	} catch(err) {
		next(err)
	} 
})

// EDIT -- GET
router.get('/:id/edit', async (req, res, next) => {
	try {
		const foundPost = await Post.findById(req.params.id).populate('user')
		req.session.userId == foundPost.user._id

		if(req.session.username == foundPost.user.username) {
			res.render('posts/edit.ejs', {
			post: foundPost,
			})
		} else {
			req.session.message = "YOU DO NOT HAVE PERMISSION TO ACCESS THIS."
			res.redirect('/')
		}
	} catch(err) {
		next(err)
	}
})




module.exports = router