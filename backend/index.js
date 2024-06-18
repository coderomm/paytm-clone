const express = require("express");
const cors = require('cors');
const PORT = 3000;
const app = express();
// require database connection 
const dbConnect = require("./db/dbConnect");

// execute database connection 
app.use(cors());
app.use(express.json());
dbConnect();

const mainRouter = require('./routes/index')

app.use('/api/v1', mainRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (e) => {
  console.error('Error starting server: ', e);
});