const tasksModel = require("./../models/tasksModel");
const jwt = require("jsonwebtoken");

async function handle(req, res) {

    const tasks = req.body.tasks;
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    let email = null;

    if (!token) {
        return res.status(403).json({"code": 403});
    }


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {

        if (err) {

            return res.status(403).json({"code": 403});
        }
        email = data.email;

        if (!tasks) {

            return res.status(200).json({"code": 200, "massege": "empty"});
        }
    });



    try {

        let user = await tasksModel.findOne({"email" : email});


        if (!user) {
    
            const newUser = await tasksModel.create({"email": email});
            user = await tasksModel.findOne({"email": email});
    
        } else {
    
            user.userTasks = [];
            await user.save();
        }
        
    
        for (let i = 0; i < tasks.length; i++) {
    
            user.userTasks.push({
    
                "userTask": tasks[i].userTask,
                "isDone": tasks[i].isDone
            });
        }

        await user.save();
        res.status(200).json({"code": 200});


    } catch (err) {

        console.log(err);
        res.status(500).json({"code": 500});
    }

}

module.exports = handle;