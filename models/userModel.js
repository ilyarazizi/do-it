const mongoose = require("mongoose");
const schema = mongoose.Schema;

const user = new schema({

    firstname: {

        type: String,
        required: true
    },

    lastname: {

        type: String,
        required: true,
    },

    email: {

        type: String,
        required: true,
        trim: true
    },

    password: {

        type: String,
        required: true
    }
});

module.exports = mongoose.model("users", user);