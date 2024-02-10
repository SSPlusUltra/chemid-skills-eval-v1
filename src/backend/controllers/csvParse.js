const csv = require('csv-parser');
const { Readable } = require('stream');

async function uploadCSV(fileBuffer) {
  return new Promise((resolve, reject) => {
    const data = [];
    const density = [];

    const stream = Readable.from(fileBuffer);

    stream.pipe(csv())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        data.forEach((item) => {
          const Compound = item.Compound;
          const mass = parseFloat(item.Mass);
          const Density = (mass / parseFloat(item.Volume)).toFixed(2);
          density.push({ Compound, Density });
        });
        resolve({ data, density });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

module.exports = { uploadCSV };
