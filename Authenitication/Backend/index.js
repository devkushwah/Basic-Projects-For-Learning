const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cookieParser());

require("dotenv").config();
const database = require("./config/database");
database.connect();
const PORT = process.env.PORT || 4000;

// route import and mount
const user = require('./routes/user');
app.use('/api/v1', user);

    app.get('/', (req, res) => {
    res.send('Hello World!');
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        
    });