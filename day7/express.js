const express = require('express')
const app = express()

app.use(express.json());

app.get('/api', (req, res) => {
res.json({ message: 'API is running!' });
});

const port = 3000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})