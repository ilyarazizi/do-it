const mongoose = require("mongoose");

const schema = mongoose.Schema;

const tasks = new schema({
 
    userTask: {type: String, required: true},
    isDone: {type: String, required: true}
})

const user = new schema({

    email: {

        type: String,
    },

    userTasks: [tasks]

});

module.exports = mongoose.model("tasks", user);