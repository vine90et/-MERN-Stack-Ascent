const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;

const mongoUrl = 'mongodb://localhost:27017/';
const dbName = 'resumeData';

let db,projectsCollection;

app.use(express.json());

async function connectToMongoDB() {
  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    console.log('✅ Connected successfully to MongoDB');
    db = client.db(dbName);
    projectsCollection = db.collection('projects');
    console.log(`📊 Using database: ${dbName}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = req.body;

    if (!newProject) {
      return res.status(400).json({ success: false, error: 'Title is required' });
    }

    const result = await projectsCollection.insertOne(newProject);
    const insertedProject = await projectsCollection.findOne({ _id: result.insertedId });

    res.status(201).json({ success: true, data: insertedProject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await projectsCollection.find().toArray();
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const project = await projectsCollection.findOne({ _id: new ObjectId(id) });

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: 'Invalid project ID' });
  }
});

connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});