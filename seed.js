const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Work = require('./models/work.model');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/work-expirience';
const dataPath = path.resolve('./mockData.json');

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB for seeding');
  const raw = fs.readFileSync(dataPath);
  const docs = JSON.parse(raw);
  await Work.deleteMany({});
  const created = await Work.insertMany(docs);
  console.log(`Inserted ${created.length} documents`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});