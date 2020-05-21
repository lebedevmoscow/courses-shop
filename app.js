const express = require('express')
const config = require('config')
const mongoose = require('mongoose')


const PORT = config.get('port') || 5000
const app = express()

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t/', require('./routes/redirect.routes'))

async function start() {
    try {
        const mongoUriConnectLink = config.get('mongoUri')
        //console.log(mongoUriConnectLink)
        await mongoose.connect(mongoUriConnectLink, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()