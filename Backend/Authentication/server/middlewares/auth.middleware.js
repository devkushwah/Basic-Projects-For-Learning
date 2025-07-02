const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware to authenticate user


// Authentication middleware
exports.auth =  (req, res, next) => {

    try {
    console.log("Header", req.header('Authorization'));
    console.log("Cookies", req.cookies?.token);
    console.log("Body", req.body?.token);

    const token = req.cookies?.token || req.body?.token || req.header('Authorization')?.split(' ')[1];

    if (!token || token === "undefined") {
        return res.status(401).json({
            success: false,
            message: "No token provided, please login first"
        })
    }

try {
    const decodes = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decodes);
    req.user = decodes;
} catch (error) {
    console.error("Error extracting token:", error);
    return res.status(400).json({ message: "Invalid token format" });
}

next();

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}





// Authorization middlewares for different account types
exports.isStudent = (req, res, next) => {

    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access, please login first"
            });
        }

        if (req.user.accountType !== "Student") {
            return res.status(403).json({
                success: false,
                message: "Access denied, you are not a student"
            });
        }

        next();
    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}


exports.isInstructor = (req, res, next) => {

    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access, please login first"
            });
        }

        if (req.user.accountType !== "Instructor") {
            return res.status(403).json({
                success: false,
                message: "Access denied, you are not an instructor"
            });
        }

        next();
    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}

exports.isAdmin = (req, res, next) => {

    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access, please login first"
            });
        }

        if (req.user.accountType !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied, you are not an admin"
            });
        }

        next();
    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}