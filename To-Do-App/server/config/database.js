const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully! 🎉'); 
    } 
    catch (error) {
        console.log("DB Connection Failed: ", error); 
        console.error(error.message);
        process.exit(1);
    }
}


