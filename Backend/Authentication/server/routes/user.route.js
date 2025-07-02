const express = require('express');
const router = express.Router();

const {signup, login} = require('../controllers/auth');
const {auth, isStudent, isInstructor, isAdmin} = require('../middlewares/auth.middleware');


router.post('/signup', signup);
router.post('/login', login);

router.get('/student', auth, isStudent, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Student"
    });
});

router.get('/instructor', auth, isInstructor, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Instructor"
    });
});

router.get('/admin', auth, isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Admin"
    });
});

module.exports = router;