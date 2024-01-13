const mongoose = require("mongoose")
require("dotenv").config()

const connection = mongoose.connect(`${process.env.MONGODB_URL}/ptweb14psc`)


module.exports = {connection}