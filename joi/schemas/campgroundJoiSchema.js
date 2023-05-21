const joi = require("joi");

const campgroundJoiSchema = joi.object({
    name: joi.string().required().max(32),
    price: joi.number().required().min(0),
    description: joi.string().optional().allow(""),
    location: joi.string().required().regex(/(-?\d+\.\d+), (-?\d+\.\d+)/),
    photo: joi.string().required()
}).required()

module.exports = { campgroundJoiSchema };