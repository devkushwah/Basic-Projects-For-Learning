const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // trusted ko replace karke true kar dein
  },

  email: {
    type: String,
    required: true,
    trim: true, // trusted ko replace karke true kar dein
  },

  password: {
    type: String,
    required: true,
  },

  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    required: true,
},
});

module.exports = mongoose.model("user", userSchema);
