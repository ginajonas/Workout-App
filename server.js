const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000

const app = express()

// app.use() is a function that registers middlewares on express. What that means is that whenever express runs we want to run the middleware code. in this case we are registering logger as middleware, so that it can console log every request that express handles.
app.use(logger('dev'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

// routes
app.use(require('./routes/view.js'))
app.use(require('./routes/api.js'))

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`)
})
