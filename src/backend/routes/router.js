const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { uploadCSV } = require('../controllers/csvParse');

router.post('/upload', upload.single('csvFile'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const { data, density } = await uploadCSV(file.buffer); //got file buffer from multer, sent to parse
    res.json({ data, density });
  } catch (err) {
    console.error('Error parsing CSV:', err);
    res.status(500).json({ error: 'Error parsing CSV' });
  }
});

module.exports = router;
