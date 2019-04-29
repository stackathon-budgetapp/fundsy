const plaid = require('plaid')
const {PLAID_SECRET, PLAID_CLIENT_ID, ngrok_address} = require('../../secrets')
const PLAID_PUBLIC_KEY = '65546042f77b1fd26dea9589eeddf7'
const moment = require('moment')
const router = require('express').Router()
const Transaction = require('../db/models/Transaction')
var PUBLIC_TOKEN = null

var ACCESS_TOKEN = null;
var ITEM_ID = null;

console.log('INSIDE PLAID.JS!')

const client = new plaid.Client(PLAID_CLIENT_ID, PLAID_SECRET, 
    PLAID_PUBLIC_KEY, plaid.environments.sandbox,{version: 
'2018-05-22'});


router.post('/get_access_token', async function(request, response, next) {
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, 
tokenResponse) {
    if (error != null) {
      console.log('Could not exchange public_token!' + '\n' + 
error);
      return response.json({error: error});
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    console.log('Access Token: ' + ACCESS_TOKEN);
    console.log('Item ID: ' + ITEM_ID);
    /////directly log transactions to db
    let startDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
    let endDate = moment().format('YYYY-MM-DD')
    client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
        count: 250,
        offset: 0
    }, function(error, transactionResponse) {
        if (error !== null) {
            return res.json({
                error: error
            })
        } else {
            let myTransactions = transactionResponse.transactions.transactions
            let map1 = myTransactions.map((transaction)=>({date: transaction.date,
                                                            category: transaction.category[0],
                                                            amount: transaction.amount
                                                         }))
            const transactions = await Transaction.bulkCreate({map1})
        }
    })
    
    response.json({accessToken: ACCESS_TOKEN});
  });
});

router.get('/transactions', (req, res, next) => {
    console.log('GETTING TRANSACTIONS')
    let startDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
    let endDate = moment().format('YYYY-MM-DD')
    client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
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