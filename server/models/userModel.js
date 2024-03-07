const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    // id: { type: Number, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "USER" }
}, { timestamps: true })



module.exports = mongoose.model("Users", userSchema)