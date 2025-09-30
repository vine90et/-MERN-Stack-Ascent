const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const helmet = require('helmet')
const WorkRoute = require('./routes/work.route')

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/work-expirience'


app.use('/api/work', WorkRoute)

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URI || MONGO_URI).then(()=>{
    console.log(`connect to db`)
    app.listen(process.env.PORT || PORT, ()=>{
        console.log(`app is running at port:${PORT}`)
    })
})
