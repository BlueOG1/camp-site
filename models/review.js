const mongoose = require("mongoose");
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    content: String,
    rating:{
        type: Number,
        enum: [1,2,3,4,5]
    }
})


const Review = mongoose.model("Review", reviewSchema)

module.exports = {Review}