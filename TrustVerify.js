const express = require('express')
const ConnectDatabase = require('./database/ConnectDatabase.js')
const Route = require('./routes/Routes.js')

const app = express()

ConnectDatabase()

app.use(express.json())
app.use('/api',Route)

app.get('/', (req, res) => {
    res.send({
        "Hello": "sdasdsa"
    })
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})