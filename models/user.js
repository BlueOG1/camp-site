const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        minLength: 4,
        maxLength: 32,
        match: /^[A-Za-z][A-Za-z0-9_]{4,29}$/,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema)

module.exports = { User };