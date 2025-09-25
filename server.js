const mongoose  = require("mongoose");
const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT || 3500;
const dataBaseConnect = require("./config/connectDb"); 

dataBaseConnect();

mongoose.connection.once("open", () => {

    console.log("connected to database.");

    app.listen(PORT, () => {

        console.log("server is runnig on port 3500...")
    });
});

