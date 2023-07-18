const bcrypt = require("bcrypt");

const bcryptHasher = async (password) => {
    const hashedpassword = await bcrypt.hash(password, 12)
    return hashedpassword
}

const bcryptCompare = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword)
    return result
}

module.exports = { bcryptHasher, bcryptCompare }