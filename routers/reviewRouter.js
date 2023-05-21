const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const { Campground } = require("../models/campground")
const { Review } = require("../models/review.js")
const methodOverride = require('method-override');
const morgan = require("morgan");
const ejsMateEngine = require("ejs-mate");
const joi = require("joi");
const appError = require("../utilities/appError.js");
const ObjectID = require('mongoose').Types.ObjectId;
const asyncErrorHandler = require("../utilities/asyncErrorHandler.js")
const joiValidation = require("../joi/functions/joiValidation.js")
const { campgroundJoiSchema } = require("../joi/schemas/campgroundJoiSchema.js")
const { reviewJoiSchema } = require("../joi/schemas/reviewJoiSchema.js")
app.use(methodOverride('_method'))
app.set("views", path.join(__dirname, "views"));
app.set("view enginge", "ejs");
app.engine("ejs", ejsMateEngine)
app.use(express.urlencoded({ extended: true }))
const router = express.Router({mergeParams: true});

router.post("/", joiValidation(reviewJoiSchema), asyncErrorHandler(async (req, res, next) =>{
    await Campground.findById(req.params.id)
    .then(async (campground) =>{
        const {review} = req.body
        const newReview = new Review(review)
        campground.reviews.push(newReview)
        await newReview.save()
        await campground.save()
        res.redirect(`/campgrounds/${req.params.id}`)
    })
}))

router.delete("/:revId", asyncErrorHandler(async (req, res, next) => {
    await Review.findByIdAndDelete(req.params.revId)
    await Campground.findByIdAndUpdate(req.params.id, {$pull: {reviews: req.params.revId}})
    res.redirect(`/campgrounds/${req.params.id}`)
}) )

module.exports = router;