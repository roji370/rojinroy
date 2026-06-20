function dbConnect() {
    // Db connection
    const mongoose = require('mongoose')
    const url = 'mongodb://127.0.0.1/comments'

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database connected...')
    }).catch(err => {
        console.log('Database connection failed. Server will continue in offline mode...')
    })

    // Catch connection error events after initial connection
    mongoose.connection.on('error', err => {
        console.log('Database error:', err.message)
    })
}

module.exports = dbConnect