const mongoose = require('mongoose');
const app = require('./app');
const https = require('https');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5050;

const options = {
    key: fs.readFileSync('../certs/server.key'),
    cert: fs.readFileSync('../certs/server.crt'),
};

mongoose.connect(process.env.MONGO_CONNECTION)
.then(() => {
    https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running at https://localhost:${PORT}`);
    });
});