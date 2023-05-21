const joi = require("joi");

const reviewJoiSchema = joi.object({
    review: {
        content: joi.string().required(),
        rating: joi.number().valid(1, 2, 3, 4, 5)
    }
}).required()

module.exports = {reviewJoiSchema}