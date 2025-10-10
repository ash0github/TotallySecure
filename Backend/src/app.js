const express = require('express');
const cookies = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

//routes
const authRoutes = require('../routes/authRoutes');
const transRoutes = require('../routes/transRoutes');
const userRoutes = require('../routes/userRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookies());
app.use(helmet());
app.use(cors({
    origin: "https://localhost:4114",
    credentials: true
}));

app.use("/totallysecure/auth", authRoutes);
app.use("/totallysecure/transaction", transRoutes);
app.use("/totallysecure/user", userRoutes);

app.get('/', (req, res) => {
    res.send('TotallySecure!!');
});

module.exports = app;