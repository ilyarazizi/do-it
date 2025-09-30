const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("./../models/userModel");


async function loginHandler(req, res) {

    const email = req.body.email;
    const pass = req.body.password;

    if (!email || ! pass) {
    
        return res.status(400).json({"code": 400});
    }

    const find = await user.findOne({"email": email}).exec();

    if (!find) {


        return res.status(401).json({"code": 401});
    }

    const passMatch = await bcrypt.compare(pass, find.password);

    if (!passMatch) {
        return res.status(401).json({"code": 401});

    }

    const accessToken = jwt.sign(
        {"email": find.email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "10m"}
        
    );

    const refreshToken = jwt.sign(
        {"email": find.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "7d"}
        
    );

    res.cookie("jid", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000

    });

    res.json({"code": 200, "accessToken": accessToken});

}

module.exports = loginHandler;