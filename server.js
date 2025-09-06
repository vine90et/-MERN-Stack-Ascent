const express = require('express');
const {MongoClient } = require('mongodb');
const app = express();
app.use(express.json());
const port = 3000;
const url = "mongodb://localhost:27017"
const dbName = 'resumeData';
let db;
async function mongodbClient(){
    const client = new MongoClient (url);
    try{
        await client.connect();
        console.log("✅ Connected successfully to MongoDB");
        db = client.db(dbName);
        console.log(`📊 Using database: ${dbName}`);
        return db;
    }catch(err){
        console.error("error occured",err);
    }
}
app.get('/api/status', (req, res) => {
res.json({
message: 'MongoDB connection successful!',
database: dbName,
status: 'connected',
timestamp: new Date().toISOString()
});
});
mongodbClient().then(() => {
app.listen(port, () => {
console.log(`🚀 Server running on http://localhost:${port}`);
});
}).catch(error => {
console.error('Failed to start server:', error);
process.exit(1);
});