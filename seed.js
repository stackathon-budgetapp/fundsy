const db = require('./server/db')
const { User, Account, Transaction } = require('./server/db/models')

const transactionData = [
    {
        date: '2019-01-01',
        amount: 5000,
        description: 'lob dsgoa ihuweglej WBN LGJ Obdsg',
        category: 'category-1'
    },
    { 
        date: '2019-02-01',
        amount: 9048,
        description: 'lob dsgoa ihuweglej WBN LGJ Obdsg',
        category: 'category-2'
    },
    {
        date: '2019-03-01',
        amount: 2830,
        description: 'lob dsgoa ihuweglej WBN LGJ Obdsg',
        category: 'category-3'
    },
    {
        date: '2019-01-01',
        amount: 8300,
        description: 'lob dsgoa ihuweglej WBN LGJ Obdsg',
        category: 'category-2'
    },
    { 
        date: '2019-02-01',
        amount: 3658,
        description: 'lob dsgoa ihuweglej WBN LGJ Obdsg',
        category: 'category-1'
    },
    {
        date: '2019-03-01',
        amount: 2880,
        description: 'lob dsgoa ihuweglej WBN LGJ Obdsg',
        category: 'category-3'
    },
]

async function seed() {
    await db.sync({force: true})

    const transactions = await Transaction.bulkCreate(transactionData)
}

async function runSeed() {
    console.log('seeding...')
    try {
        await seed()
    } catch (err) {
        console.log(err)
    } finally {
        console.log('closing db connection')
        await db.close()
        console.log('connection closed!')
    }
}

if(module === require.main) runSeed()

module.exports = seed