const path = require('path')
const db = require('./db')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
// const passport = require('passport')
// const session = require('express-session')
// const db = require('./db/db')
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const dbStore = new SequelizeStore({ db: db });

const app = express()

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

console.log('BEFORE PLAID!')
app.use('/plaid', require('./plaid'))
console.log('/AFTER PLAID!')

app.get('/', (req, res, next) => {
  res.send('HELLO!')
})
app.use(function(err, req, res, next) {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })


db.sync()

const port = process.env.PORT || 3000

app.listen(port, function() {
  console.log(`listening on port ${port}`)
})

