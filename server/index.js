const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const db = require('./db/db')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
const plaid = require('plaid')
const {secret, clientId} = require('../secrets')
const PLAID_PUBLIC_KEY = '65546042f77b1fd26dea9589eeddf7'

const app = express()

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const client = new plaid.Client(clientId, secret, 
    PLAID_PUBLIC_KEY, plaid.environments.sandbox);

app.post('/get_access_token', function(request, response, next) {
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, 
tokenResponse) {
    if (error != null) {
      console.log('Could not exchange public_token!' + '\n' + 
error);
      return response.json({error: msg});
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    console.log('Access Token: ' + ACCESS_TOKEN);
    console.log('Item ID: ' + ITEM_ID);
    response.json({'error': false});
  });
});

app.use(function(err, req, res, next) {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })

  const port = process.env.PORT || 3000

  app.listen(port, function() {
    console.log(`listening on port ${port}`)
  })