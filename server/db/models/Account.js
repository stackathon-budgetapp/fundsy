const Sequelize = require('sequelize')
const db = require('../index')
const moment = require('moment')

const Account = db.define('account', {
    accessToken: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    lastUpdate: {
        type: Sequelize.DATEONLY,
        get: function() {
            return moment.utc(this.getDataValue('regDate').format('YYYY-MM-DD'))
        }
    }
})

module.exports = Account