import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true }, // Google login users ke liye unique ID
  displayName: String,
  image: String,

  name: { type: String, required: true, trim: true },

  username: { 
    type: String,
    unique: false, // Unique constraint hata diya 
    default: function () {
        return this.displayName ? this.displayName.toLowerCase().replace(/\s+/g, '') + "_" + Date.now() : null;
    } // Agar Google user hai to `displayName` se username generate hoga
},
email: {
  type: String,
  trim: true,
  unique: true, // Email unique honi chahiye
  sparse: true, // Google users ke liye email optional ho sakta hai
},
password: {
  type: String, 
  default: null, // Custom login users ke liye password hoga, Google login users ke liye `null`
},

  is_verified: { type: Boolean, default: false },

  roles: { type: [String], enum: ["user", "admin"], default: ["user"] },
  
}, { timestamps: true });

// Model
const UserModel = mongoose.model("user", userSchema)

export default UserModel