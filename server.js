require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth')

const app = express()
app.use(express.json())

const PORT = process.env.PORT;
const mongo_URI = process.env.MONGO_URI;

app.use('/api/auth', auth);
mongoose.connect(mongo_URI).then(()=>{
    console.log('connected to mongodb')
    app.listen(PORT,()=>{
        console.log(`running at port:${PORT}`)
    })
})
