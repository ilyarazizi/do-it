const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const user = require("./../models/userModel");

async function handeNewUser(req, res) {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const pass = req.body.password;

    if (!fname || !lname || !email || !pass) {

        return res.status(400).json({"code" : "400"});
    }

    const duplicate = await user.findOne({"email": email});

    if (duplicate) {

        return res.status(409).json({"code": 409});

    }

    try {
        
        const crypPass = await bcrypt.hash(pass, 10);
        const result = await user.create({

            "firstname": fname,
            "lastname": lname,
            "email": email,
            "password": crypPass
        });

        res.status(200).json({"code": 200});        

    } catch (err) {

        res.status(500).json({"eror": err, "code": 500});
    }

}

module.exports = handeNewUser;