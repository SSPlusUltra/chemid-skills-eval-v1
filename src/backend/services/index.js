const router = require('../routes/router')
const express = require('express')
const cors = require('cors');
const port = 8080


const app = express();
const corsOptions = {
	origin: 'http://localhost:8081',
  };
  
  app.use(cors(corsOptions));

app.use('/', router)
app.listen(port, () => {
	console.log('-----------------------------------')
	console.log(`SERVER STARTED AND LISTENING ON PORT ${port}`)
})