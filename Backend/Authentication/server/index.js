const express  = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const database = require('./config/database')
app.use(express.json());

database()

const userRoutes = require('./routes/user.route')
app.use('/api/v1', userRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

