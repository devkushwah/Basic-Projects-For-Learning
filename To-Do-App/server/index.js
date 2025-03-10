const express = require('express');
const bodyParser = require('body-parser')
const database = require('./config/database');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('dotenv').config();
const PORT = process.env.PORT || 5000;

// connect to the database
database.connect();

app.use( 
	cors({
		origin:"http://localhost:5173",
		credentials:true,
	})
)

const todoRoutes = require('./routes/todo');
app.use('/api/v1', todoRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});
