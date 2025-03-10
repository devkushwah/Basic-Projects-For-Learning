const mongoose = require('mongoose');
require('dotenv').config();

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,

    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,

    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Todo', todoSchema);