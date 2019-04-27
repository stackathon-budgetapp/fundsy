const path = require('path')
const db = require('./db')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const dbStore = new SequelizeStore({ db: db });

const app = express()

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

app.use(passport.initialize())
app.use('/auth', require('./auth'))
app.use('/plaid', require('./plaid'))

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

