const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {

        // Extract JWT token 
        console.log(req.body);
        console.log("cookies", req.cookies?.token)
        console.log("body", req.body?.token)
        console.log("header", req.header("Authorization"))
        
        // 1. Get token from request
        const token = req.cookies?.token || 
                     req.body?.token || 
                     req.header("Authorization")?.replace("Bearer ", "");  // Fixed space after Bearer

        // 2. Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }

        // 3. Verify token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
            next();
        }
        catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token"
        });
    }
}

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students",
            });
        }
        
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not matching",
        });
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for admins",
            });
        }
        
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not matching",
        });
    }
};
