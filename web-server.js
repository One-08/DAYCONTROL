const express = require('express');
const path = require('path');
const app = express();

// Serve static files from web folder
app.use(express.static(path.join(__dirname, 'web')));

// Fallback to index.html for SPA
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Web app running on http://localhost:${PORT}`);
});
