const express = require('express');
const mongoose = require('mongoose');
const workRouter = require('./router/router')
const errorHandler = require('./middleWare/errorHandler')

const app = express();

const PORT = 3000;
const URL = 'mongodb://localhost:27017/resumeData';

app.use(express.json());
app.use('/api/work-experience', workRouter);
app.use(errorHandler);

mongoose.connect(URL).then(()=>{
    console.log('DataBase Connected Succcessfully')
        app.listen(PORT,()=>{
            console.log(`server started at port: ${PORT}`)
        })
}).catch(err => console.error('❌ DB Connection Error:', err.message));