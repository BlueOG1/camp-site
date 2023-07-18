const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const { Campground } = require("./models/campground.js")
const { Review } = require("./models/review.js")
const methodOverride = require('method-override');
const morgan = require("morgan");
const ejsMateEngine = require("ejs-mate");
const joi = require("joi");
const appError = require("./utilities/appError.js");
const ObjectID = require('mongoose').Types.ObjectId;
const asyncErrorHandler = require("./utilities/asyncErrorHandler.js")
const joiValidation = require("./joi/functions/joiValidation.js")
const { campgroundJoiSchema } = require("./joi/schemas/campgroundJoiSchema.js")
const { reviewJoiSchema } = require("./joi/schemas/reviewJoiSchema.js")
const campgroundRouter = require("./routers/campgroundRouter.js")
const reviewRouter = require("./routers/reviewRouter.js")
const accountRouter = require("./routers/accountRouter.js")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")

app.use(methodOverride('_method'))
app.set("views", path.join(__dirname, "views"));
app.set("view enginge", "ejs");
app.engine("ejs", ejsMateEngine)
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

const mongoDB = "mongodb://localhost:27017/yelpcampdb";
const connect = mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DATABASE CONNECTION OPEN")
    })
    .catch((ERR) => {
        console.log("DATABASE CONNECTION FAILED")
        console.log(ERR)
    })
app.listen(3000, () => {
    console.log("listetning on port 3000");
})

const sessionConfig = {
    secret: "randomKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + (60 * 60 * 24),
        maxAge: 60 * 60 * 24
    }
}
app.use(session(sessionConfig))

app.use(flash())

app.use((req, res, next) => {
    res.locals.message = req.flash("message");
    next()
})


app.use("/campgrounds", campgroundRouter)
app.use("/campgrounds/:id/reviews", reviewRouter)
app.use("/account", accountRouter)

app.get("/error", (req, res) => {
    res.render("./errors/error.ejs")
})

app.all('*', (req, res, next) => {
    next(new appError("Not found", 404))
})

app.use((err, req, res, next) => {
    if (!err.status) { err.status = 500 };
    console.log(`${err.status}:::::: ${err.message}::::${err}`)
    return res.status(err.status).render("./errors/error.ejs", { err: err })
})
