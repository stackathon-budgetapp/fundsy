const Sequelize = require('sequelize')
const db = require('../index')
const moment = require('moment')
const crypto = require('crypto')

const Account = db.define('account', {
    accessToken: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        // get () {
        //     return () => this.getDataValue('accessToken')
        // }
    },
    lastUpdate: {
        type: Sequelize.DATEONLY,
        // get: function() {
        //     return moment.utc(this.getDataValue('regDate').format('YYYY-MM-DD'))
        // }
    }
})

module.exports = Account

// Account.prototype.correctToken = function(candidateToken) {
//     return Account.encryptToken(candidateToken, this.salt()) === this.accessToken()
// }

// Account.generateSalt = function() {
//     return crypto.randomByes(16).toString('base64')
// }

// Account.encryptToken = function(plainText, salt) {
//     return crypto
//         .createHash('RSA-SHA256').update(plainText).update(salt).digest('hex')
// }

// const setSaltAndToken = account => {
//     if (account.changed('accessToken')){
//         account.salt = Account.generateSalt()
//         account.accessToken = Account.encryptToken(account.accessToken(), account.salt())

//     }
// }

// Account.beforeCreate(setSaltAndToken)

