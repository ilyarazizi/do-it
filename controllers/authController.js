const jwt = require("jsonwebtoken");

function privateData(req, res) {


    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    if (!token) {

        return res.status(403).json({"code": 403});
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {

        if (err) {

            return res.status(403).json({"code": 403});
        }

    });

    res.status(200).json({"code": 200});
}

function refresh(req, res) {

    const token = req.cookies["jid"];
    let email = null;

    if (!token) {

        return res.status(403).json({"code": 403});
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, data) => {

        if (err) {

            return res.status(403).json({"code": 403});
        }

        email = data.email;
    });

    const newAccessToken = jwt.sign(
        {"email": email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"}
    
    );

    res.json({"code": 200, "accessToken": newAccessToken});

}

module.exports = {privateData, refresh};