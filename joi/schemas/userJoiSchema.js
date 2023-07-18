const joi = require("joi");
const mongoose = require("mongoose");

const userJoiSchema = joi.object({
    username: joi.string().required().min(4).max(32).regex(/^[A-Za-z][A-Za-z0-9_]{7,29}$/)
    //Funkcja sprawdzająca czy dany username jest zajęty -              !DO SKOŃCZENIA!
    /*.external(async (username) => {
        await User.find({ username: username })
            .then((username) => {
                if (!username) {
                    throw new Error("username is already in use")
                }

            })
    })*/
})

module.exports = { userJoiSchema }