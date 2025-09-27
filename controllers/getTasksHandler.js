const tasksModel = require("./../models/tasksModel");
const jwt = require("jsonwebtoken");

async function handle(req, res) {

    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    let email = null;
    let count = null;
    let tasks = [];
    let isDone = [];

    console.log(token);

    if (!token) {
        return res.status(403).json({"code": 403});
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {

        if (err) {

            return res.status(403).json({"code": 403});
        }

        email = data.email;

    });

    const user = await tasksModel.findOne({"email": email});

    if (!user) {

        return res.status(400).json({"code": 400});
    }
    console.log(user);
    count = user.userTasks.length;

    for (let i = 0; i < user.userTasks.length; i++) {

        tasks.push(user.userTasks[i].userTask);
        isDone.push(user.userTasks[i].isDone);
        
    }

    res.status(200).json({"count": count, "tasks": tasks, "isDone": isDone, "code": 200});

}


module.exports = handle;