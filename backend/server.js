const express = require('express')
const cors = require('cors')
const app = express();
app.use(express.json())
const PORT = 3000;

app.use(cors());

const projects = [
  { id: 1, name: "Portfolio Website", description: "Personal portfolio" },
  { id: 2, name: "E-commerce App", description: "Full MERN stack store" },
  { id: 3, name: "Blog Platform", description: "Blogging with comments" }
];

app.get("/api/project", (req, res) => {
  res.json(projects);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});