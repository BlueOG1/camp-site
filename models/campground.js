const { func } = require("joi");
const mongoose = require("mongoose");
const { Review } = require("./review");
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true,
        validate: /(-?\d+\.\d+), (-?\d+\.\d+)/
    },
    photo: {
        type: String,
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }]

})

campgroundSchema.post("findOneAndDelete", async (deletedCampground) => {
    await Review.deleteMany({_id: { $in: deletedCampground.reviews}})
})

const Campground = mongoose.model("Campground", campgroundSchema)
module.exports = { Campground }