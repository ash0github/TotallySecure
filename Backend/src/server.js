const mongoose = require('mongoose');
const app = require('./app');
const https = require('https');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5050;

const isRender = process.env.RENDER === 'true'

if (isRender) {
  // use plain HTTP for Render
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running (HTTP) on port ${PORT}`);
  });
} 
else 
{
    const options = {
    key: fs.readFileSync(path.join(__dirname, '../certs/server.key')),
    cert: fs.readFileSync(path.join(__dirname, '../certs/server.crt')),
};

mongoose.connect(process.env.MONGO_CONNECTION)
.then(() => {
    https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running at https://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error('MongoDb connection failed. Error:', err);
});
}