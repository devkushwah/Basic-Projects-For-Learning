const jwt = require('jsonwebtoken');
const User = require('../modules/user');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();


// Register a new user
exports.signup = async (req, res) => {
 
    try {
           const {name, email, password, confirmPassword, accountType} = req.body;

    if (!name || !email || !password || !confirmPassword || !accountType) {
        return res.status(400).json({message: "All fields are required"});
    }

    if (password !== confirmPassword) {
        return res.status(400).json({message: "Passwords do not match"});
    }

    // Check if user already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json(({message: "User already exists"}));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        accountType
    })
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }


}


exports.login = async (req, res) => {
    try {
        const {email, password, accountType} = req.body;

    if (!email || !password || !accountType) {
        return res.status(400).json({message: "Email, password and account type are required"});
    }

    const user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({message: "User is not registered"});
    }   

    // Check if account type matches - ADD THIS VALIDATION
    if (user.accountType !== accountType) {
        return res.status(400).json({
            success: false,
            message: `Invalid account type. This user is registered as ${user.accountType}, not ${accountType}`
        });
    }   

    // payload
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        accountType: user.accountType
    };

    // Verify password
    if (await bcrypt.compare(password, user.password)) {
        // Generate JWT Token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        // return res.status(200).json({ token, user: payload });

        const userObj = {
            id: user._id,
            name: user.name,
            email: user.email,
            accountType: user.accountType
        };

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
            httpOnly: true,
        }

        res.cookie("token", token, options);
        res.header('Authorization', `Bearer ${token}`);
        return res.status(200).json({
            success: true,
            token,
            user: userObj,
            message: "Login successful"
        });
    }

    else {
        return res.status(400).json({message: "Invalid email or password"});
    }

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}