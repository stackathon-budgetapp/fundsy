const User = require('./User')
const Account = require('./Account')
const Transaction = require('./Transaction')

User.hasMany(Account)

module.exports = {
    User,
    Account
}