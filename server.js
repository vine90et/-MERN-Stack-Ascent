require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/user.route')
const commentRoutes = require('./routes/comment.route')
const postRoute = require('./routes/Post.route')

const morgan = require('morgan');
const cors = require('cors');

const app =express();

const Db = 'Blogs';
const Url = `mongodb://localhost:27017/${Db}`;
const PORT = 3000;
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

app.use('/api/auth', auth);
app.use('/api/comment', commentRoutes)
app.use('/api/post', postRoute)



mongoose.connect(Url).then(()=>{
    console.log('connect to Db')
    app.listen(PORT, ()=>{
        console.log('server running at port:',PORT)
    })
}).catch(err => {
    console.error('❌ DB Connection Error:', err.message);
    process.exit(1);
  });