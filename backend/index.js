const connectToMongo = require('./db');
const express = require('express')
const cors = require("cors");
const authRoutes = require("./routes/auth");
const companyD = require("./routes/companyD");
require('dotenv').config();


connectToMongo();
const app = express()
app.use(cors());
const port = 5000


app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/companyD', require('./routes/companyD'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

