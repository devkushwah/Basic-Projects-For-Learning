const mongoose = require('mongoose');

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then( () => console.log("DB is conncted sussessfully"))
    .catch( (err) => {
        console.log("DB Connection Failed");
        console.log(err)
        console.log(message.error);
        process
        .exit(1);
    }
         

);
};

