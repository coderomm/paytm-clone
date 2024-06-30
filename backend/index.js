const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 3000;
const dbConnect = require("./db/dbConnect");
const mainRouter = require("./routes/index");

// This is added new
const allowedOrigins = ['http://localhost:5173', 'http://192.168.43.126:5173'];

// app.use(cors({
//   origin: 'http://localhost:5173', // Replace with your frontend domain
//   credentials: true
// }));

app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
dbConnect();

app.use('/api/v1', mainRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// }).on('error', (e) => {
//   console.error('Error starting server: ', e);
// });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://192.168.43.126:${PORT}`);
}).on('error', (e) => {
  console.error('Error starting server: ', e);
});