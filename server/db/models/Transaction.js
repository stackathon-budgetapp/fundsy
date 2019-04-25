const Sequelize = require('sequelize')
const db = require('../index')
const moment = require('moment')

const Transaction = db.define('transaction', {
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        get: function() {
            return moment.utc(this.getDataValue('regDate').format('YYYY-MM-DD'))
        }
    }, 
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    category: {
        type: Sequelize.STRING
    }
})

module.exports = Transaction