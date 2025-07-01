const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config(); 

// signUp route handler
exports.signup = async (req, res) => {
    
    try {
    // Destructure fields from the request body
    
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        // contactNumber,
        // otp
    } = req.body;

    // Check if All Details are there or not
    if(!firstName || !lastName || !email || !password || !confirmPassword ) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    console.log("All fields are there");

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message:
            "Password and Confirm Password do not match. Please try again.",
        })
      }
      console.log("Password and Confirm Password Matched");

  // Check if user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists. Please sign in to continue.",
    })
  }
  console.log("User does not exist");
    // Find most recent OTP stored for user
    // const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    // console.log(recentOtp);

    // // Validate otp
    // if(recentOtp.length === 0){
    //     // OTP not found for the email
    //     return res.status(400).json({
    //         success: false,
    //         message: "OTP is not valid"
    //     })
    // } else if (otp !== recentOtp[0].otp) {
    //     // Invalid otp
    //     return res.status(400).json({
    //         success: false,
    //         message: "The otp is not invalid" 
    //     })
    // }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
     console.log("Password Hashed");

    // Create the user
    // let approved = accountType === "Instructor" ? false : true;
    // console.log("User Created");

    // Create the Additional Profile For User
    // const profileDetails = await Profile.create({
    //     gender: null,
    //     dateOfBirth: null,
    //     about: null,
    //     contactNumber: null
    // });
    // console.log("Profile Created");

    accountType = "Student";
    const user = await User.create({
        firstName,
        lastName,
        email,
        // contactNumber,
        password: hashedPassword,
        accountType,
        // approved: approved,
        // additionalDetails: profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    console.log("User Created");

    // resturn response
    return res.status(200).json({
        success: true,
        message: "User Registered Successfully",
        user,
    });
    

    } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "User cannot be registered. Please try again.",
        })
      }


}

// login handler route
exports.login = async (req, res) => {
    try{
        // Data fetch 
        console.log("Received data:", req.body);
        const { email, password } = req.body; 

        // Validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully"
            });
        }

        // Check for registered user
        const user = await User.findOne({ email });
        // If not a registered user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered"
            });
        }

        // Payload(body)
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };

        // Verify password & generate a JWT Token
        if (await bcrypt.compare(password, user.password)) {
            // password matched
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

            const userObj = user.toObject();    // user ko object banane ki need kyo padi ye to mujhe khud nahi pta
            userObj.token = token;
            userObj.password = undefined;

            

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };                

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user: userObj,
                message: "User login successfully"
            });
        } 
        else {
            // password does not match
            return res.status(400).json({
                success: false,
                message: "password is incorrect"
            });
        }
    }

    catch(error) { 
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure"
        });
    }
};
