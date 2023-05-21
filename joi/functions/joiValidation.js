const joi = require("joi")
const appError = require("../../utilities/appError.js")

function joiValidation(joiSchema) {
    return function (req, res, next) {
        const reqData = req.body;
        if(req.body.location){
        reqData.photo = "https://img.freepik.com/premium-vector/camping-vintage-graphic-illustration-vector-art-tshirt-design_24519-2509.jpg?w=2000";
        }
        const validationRes = joiSchema.validate(reqData);
        console.log(validationRes)
        if (validationRes.error) {
            return next(new appError(validationRes.error.message, 400))
        } else {
            next()
        }
    }
}

module.exports = joiValidation;