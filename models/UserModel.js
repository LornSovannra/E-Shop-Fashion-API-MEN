const mongoose = require("mongoose")
const { Schema } = mongoose

const UserModel = new Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},{timestamps: true}
)

module.exports = mongoose.model("Users", UserModel)