const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const { Readable } = require('stream');

const upload = multer();

router.post('/upload', upload.single('csvFile'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const data = [];
  const density = [];

  const stream = Readable.from(file.buffer);

  stream.pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      console.log(data);
      data.forEach((item) => {
        const Compound = item.Compound;
        const mass = parseFloat(item.Mass);
        const Density = mass / parseFloat(item.Volume);
        density.push({ Compound, Density });
      });
      console.log(data, density);

      res.json({ data, density });
    })
    .on('error', (err) => {
      console.error('Error parsing CSV:', err);
      res.status(500).json({ error: 'Error parsing CSV' });
    });
});

module.exports = router;
