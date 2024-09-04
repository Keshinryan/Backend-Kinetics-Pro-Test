const express = require('express');
const cors= require('cors');
const app = express();
const port = 3000;
const formMiddleware = require('./Controller/FormController');

app.use(express.json());
app.use(cors());

app.use(cors({
    origin: ['http://localhost:5173','https://frontend-kinetics-pro-test.vercel.app/']
  }));
// Use the form middleware
app.use('/api', formMiddleware); // Prefix all routes in the formMiddleware with /api

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
