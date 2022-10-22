// Dependencies
const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validator: {
            validate: function (value) {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validator: {
            validate: function (value) {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
            }
        }
    },
    avatarProfile: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})


const User = model("User", userSchema);



// Module Export
module.exports = User;