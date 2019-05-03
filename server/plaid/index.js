const plaid = require('plaid')
const {PLAID_SECRET, PLAID_CLIENT_ID, ngrok_address} = require('../../secrets')
const PLAID_PUBLIC_KEY = '65546042f77b1fd26dea9589eeddf7'
const moment = require('moment')
const router = require('express').Router()
const Account = require('../db/models/Account')
const User = require('../db/models/User')
var PUBLIC_TOKEN = null

var ACCESS_TOKEN = null;
var ITEM_ID = null;

console.log('INSIDE PLAID.JS!')

const client = new plaid.Client(PLAID_CLIENT_ID, PLAID_SECRET, 
    PLAID_PUBLIC_KEY, plaid.environments.sandbox,{version: 
'2018-05-22'});


router.post('/get_access_token', async function(request, response, next) {
    console.log('GET ACCESS TOKEN TRIGGERED!')
    console.log('USERID IN BODY IS: ', request.body.userId)
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, async function(error, tokenResponse) {
    if (error != null) {
      console.log('Could not exchange public_token!' + '\n' + error);
      return response.json({error: error});
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    console.log('Access Token: ' + ACCESS_TOKEN);
    console.log('Item ID: ' + ITEM_ID);
    try {
        const newAcct = await Account.create({accessToken: ACCESS_TOKEN, 
                            lastUpdate: Date.now()})
        // console.log(newAcct)
        const user = await User.findOne({
            where: {
                id: request.body.userId}
        })
        // console.log('user!', user)
        // // await user.setAccount(newAcct) - did not work, still null
        // newAcct.userId = request.body.userId
        user.addAccount(newAcct)
        console.log('ACCESS TOKEN INSTANCE SHOULD HAVE BEEN ADDED TO DB!')
        response.json({accessToken: ACCESS_TOKEN});}
    catch(err){
        console.log(err)
    }
  });
});

router.get('/transactions', (req, res, next) => {
    console.log('GETTING TRANSACTIONS')
    let startDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
    let endDate = moment().format('YYYY-MM-DD')
    client.getTransactions('access-sandbox-2d57743d-4469-406c-a3d9-09a2ed97dc46', startDate, endDate, {
        count: 250,
        offset: 0
    }, function(error, transactionResponse) {
        if (error !== null) {
            return res.json({
                error: error
            })
        } else {
            res.json({transactions: transactionResponse})
        }
    })
})

module.exports = router