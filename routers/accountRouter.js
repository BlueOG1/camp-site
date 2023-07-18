const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const { User } = require("../models/user.js")
const methodOverride = require('method-override');
const morgan = require("morgan");
const ejsMateEngine = require("ejs-mate");
const joi = require("joi");
const appError = require("../utilities/appError.js");
const ObjectID = require('mongoose').Types.ObjectId;
const asyncErrorHandler = require("../utilities/asyncErrorHandler.js")
const { bcryptHasher, bcryptCompare } = require("../utilities/bcryptFuncs.js")
const joiValidation = require("../joi/functions/joiValidation.js")
const { userJoiSchema } = require("../joi/schemas/userJoiSchema.js")
app.use(methodOverride('_method'))
app.set("views", path.join(__dirname, "views"));
app.set("view enginge", "ejs");
app.engine("ejs", ejsMateEngine)
app.use(express.urlencoded({ extended: true }))
const router = express.Router({ mergeParams: true });


router.get("/register", (req, res, next) => {
    res.render("../views/account/register.ejs")
})

router.post("/register", async (req, res, next) => {
    const newUser = await new User({
        username: req.body.username, password: await bcryptHasher(req.body.password)
    }).save()
    req.flash("message", ["Success!", "Account has been created successfully!"])
    res.redirect("/campgrounds")
})

router.get("/login", async (req, res, next) => {
    res.render("../views/account/login.ejs")
})

router.post("/login", async (req, res, next) => {
    const loggingUser = await User.findOne({ username: req.body.username })
    console.log(loggingUser)
    if (!loggingUser) {
        req.flash("message", ["Failed!", "Password or username incorrect"])
        return res.redirect("/account/login")
    }
    if (await bcryptCompare(req.body.password, loggingUser.password) && req.body.username === loggingUser.username) {
        console.log("Logged in!")
        res.redirect("/account/myaccount")
    } else {
        req.flash("message", ["Failed!", "Password or username incorrect"])
        res.redirect("/account/login")
    }
})

module.exports = router;