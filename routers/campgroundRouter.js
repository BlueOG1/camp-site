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
const router = express.Router();

router.get("", asyncErrorHandler(async (req, res) => {
    const campgrounds = await Campground.find()
    res.render("./campgrounds/campgroundsAll.ejs", { campgrounds: campgrounds })
}))

router.get("/new", (req, res) => {
    res.render("./campgrounds/campgroundNew.ejs")
})

router.get("/:id", asyncErrorHandler(async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        req.flash("message", ["Problem occured", "campground's id is invalid"])
        res.redirect("/campgrounds")
        //return next(new appError('Invalid Id', 400));
    }
    const campground = await Campground.findOne({ _id: req.params.id }).populate("reviews")
    if (!campground) {
        req.flash("message", ["Problem occured", "campground no longer exists"])
        res.redirect("/campgrounds")
        //return next(new appError("not found", 404));
    }
    res.render("./campgrounds/campground.ejs", { campground: campground})
}))

router.post("", joiValidation(campgroundJoiSchema), asyncErrorHandler(async (req, res, next) => {
    const campgroundData = req.body;
    campgroundData.photo = "https://img.freepik.com/premium-vector/camping-vintage-graphic-illustration-vector-art-tshirt-design_24519-2509.jpg?w=2000";
    const newCampground = await new Campground({ name: campgroundData.name, price: campgroundData.price, description: campgroundData.description, location: campgroundData.location, photo: "https://img.freepik.com/premium-vector/camping-vintage-graphic-illustration-vector-art-tshirt-design_24519-2509.jpg?w=2000" })
    await newCampground.save()
    req.flash("message", ["Success!","created new campground successfully"])
    res.redirect(`/campgrounds/${newCampground._id}`)
}))

router.patch("/:id",joiValidation(campgroundJoiSchema), asyncErrorHandler(async (req, res, next) => {
    let updatedCampground = await Campground.findById(req.params.id)
    Object.assign(updatedCampground, { id: req.params.id, name: req.body.name, price: req.body.price, description: req.body.description, location: req.body.location, photo: "https://img.freepik.com/premium-vector/camping-vintage-graphic-illustration-vector-art-tshirt-design_24519-2509.jpg?w=2000" })
    await updatedCampground.save()
    req.flash("message", ["Success!","campground updated successfully"])
    res.redirect(`/campgrounds/${req.params.id}`)
}))

router.delete("/:id", asyncErrorHandler(async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id)
    req.flash("message", ["Success!","campground has been deleted successfully"])
    res.redirect("/campgrounds")
}))
/*
router.post("/:id/reviews", joiValidation(reviewJoiSchema), asyncErrorHandler(async (req, res, next) =>{
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

router.delete("/:id/reviews/:revId", asyncErrorHandler(async (req, res, next) => {
    await Review.findByIdAndDelete(req.params.revId)
    await Campground.findByIdAndUpdate(req.params.id, {$pull: {reviews: req.params.revId}})
    res.redirect(`/campgrounds/${req.params.id}`)
}) )
*/


module.exports = router;