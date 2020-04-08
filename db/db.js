const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URI

mongoose.connect(connectionString, {
	useNewUrlParser: true,
  	useUnifiedTopology: true,
  	useFindAndModify: false 
})

mongoose.connection.on('connected', () => {
	console.log(`Connected to database`)
})

mongoose.connection.on('disconnected', () => {
	console.log(`Disconnected from database`)
})

mongoose.connection.on('error', (error) => {
	console.log(`Error with database connection`)
	console.dir(error)
})