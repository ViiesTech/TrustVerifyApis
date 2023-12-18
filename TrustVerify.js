import express from 'express'
import ConnectDatabase from './database/ConnectDatabase.js'
import Route from './routes/Routes.js'

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