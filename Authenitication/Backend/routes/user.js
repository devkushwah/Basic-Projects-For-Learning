const express = require('express');
const router = express.Router();

// Authentication
const { login, signup } = require("../controllers/Auth");
// Authorizationn
const { auth, isStudent, isAdmin } = require("../middleware/auth")

router.post("/login", login);
router.post("/signup", signup);

router.get("/student", auth, isStudent, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the protected route for student"
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the protected route for admin"
    });
});



module.exports = router;