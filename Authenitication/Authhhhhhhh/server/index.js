// ✅ Express framework ka reference liya
const express = require("express");
const app = express();

// ✅ dotenv ko sabse pehle load karna chahiye
require("dotenv").config();

// ✅ Middleware import kiye
const cors = require("cors");
const database = require("./config/database");

// ✅ CORS middleware configure kiya (Duplicate remove kiya)
app.use(
    cors({
        origin: "http://localhost:3000",     
        credentials: true,
    })
);

// ✅ JSON request ko accept karne ke liye middleware
app.use(express.json());
 
// ✅ PORT set kiya
const PORT = process.env.PORT || 8000;      

// ✅ Database connect kiya
database.connect(); 

// ✅ Routes import and mount
const user = require("./routes/user");    // Import route
app.use("/api/v1", user);   // Mount route

// ✅ Home Route
app.get("/", (req, res) => {
    res.send(`<h1> Hii, This is HomePage</h1>`);
});

// ✅ Server ko activate kiya
app.listen(PORT, () => {
    console.log(`App is listening at PORT ${PORT}`);
});
