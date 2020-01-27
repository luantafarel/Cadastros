const mongoose = require('mongoose')
const logger = require('./winston').logger

const collection = 'test'
const user = 'admin'
const password = 'test'

const connection = {
  mongoHeroku: 'mongodb://heroku_45wr8jhl:88960074tel@ds143767.mlab.com:43767/heroku_45wr8jhl',
  mongoAtlas: `mongodb+srv://${user}:${password}@cluster0-e7yyt.mongodb.net/${collection}?retryWrites=true&w=majority`,
  mongoLocal: `mongodb://localhost:27017/${collection}`
}
exports.connect = function() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(connection.mongoHeroku, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then(function() {
        logger.info('MongoDB connected!')
        resolve()
      })
      .catch(function(error) {
        logger.error(error)
        reject(error)
      })
  })
}