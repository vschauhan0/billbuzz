const connectToMongo = require('./db');
const express = require('express')
const cors = require("cors");
const authRoutes = require("./routes/auth");


connectToMongo();
const app = express()
app.use(cors());
const port = 5000


app.use(express.json())
app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

