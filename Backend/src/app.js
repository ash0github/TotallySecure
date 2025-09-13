const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

//routes
const authRoutes = require('../routes/authRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: "https://localhost:4114",
    credentials: true
}));

app.use("/totallysecure/auth", authRoutes);

app.get('/', (req, res) => {
    res.send('TotallySecure!!');
});

module.exports = app;