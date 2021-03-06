const mongoose = require('mongoose')
const Comment = require('./comment')


const postSchema = new mongoose.Schema({
  title: String,
  city: String,
  country: String,
  date: {
    type: Date,
    default: Date.now
  },
  postDescription: String,
  postPicture: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  comments: [Comment.schema]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post