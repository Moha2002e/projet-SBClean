const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const DATA_FILE = path.join(__dirname, 'reviews.json');
app.use(express.json());
// Serve static site
app.use('/', express.static(path.join(__dirname)));

app.post('/reviews', async (req, res) => {
  try {
    const rev = req.body;
    if(!rev || !rev.name || !rev.text) return res.status(400).json({ error: 'Invalid payload' });
    let arr = [];
    try { const raw = await fs.readFile(DATA_FILE, 'utf8'); arr = JSON.parse(raw || '[]'); } catch (e) { arr = []; }
    arr.unshift(rev);
    await fs.writeFile(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');
    return res.status(201).json(rev);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Reviews server running on http://localhost:${PORT}`));
