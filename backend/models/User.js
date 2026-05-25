const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    skill: {
        type: String
    },
    progress: {
        type: Number,
        default: 0
    }
});

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String
    },
    status: {
        type: String,
        default: "Pending"
    }
});

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "student"
    },

    skills: [skillSchema],

    weakAreas: [String],

    assignments: [assignmentSchema]

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);