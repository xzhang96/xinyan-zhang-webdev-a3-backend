const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoDBEndpoint = process.env.MONGODB_URI || 'mongodb://127.0.0.1/urlShortenerApp';
mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to mongo db'));

app.use(cors());

app.use('/api/url', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server starting at " + port);
})