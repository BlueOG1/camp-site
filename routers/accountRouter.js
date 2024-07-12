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
    const hashPassword = async (pw = req.body.password) => {
        const salt = await bcrypt.genSalt(12)
        hash = bcrypt.hash(pw, salt)
        return (hash)
    }
    const hashedPw = await hashPassword();
    console.log(hashedPw)
    const correctpassword = "Felek"
    console.log(await bcrypt.compare(correctpassword, hashedPw))
    res.redirect("/account/register")
})

router.get("/login", async (req, res, next) => {
    res.render("../views/account/login.ejs")
})



module.exports = router;