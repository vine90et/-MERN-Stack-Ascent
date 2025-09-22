require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const authRoute = require('./routes/auth.route')
const taskRoute = require('./routes/task.route')
const teamroute = require('./routes/team.route')

const app = express();
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/team', teamroute)
app.use('/api/task', taskRoute)



mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log(`connected to mongoDb`)
    app.listen(process.env.PORT,()=>{
        console.log(`server is running at port ${process.env.port}`)
    })
}).catch(error =>{
    console.error(error)
})