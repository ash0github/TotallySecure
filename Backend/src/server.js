const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});