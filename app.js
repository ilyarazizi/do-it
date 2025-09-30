const express = require("express");
const app = express();
const path = require("path");
const homeRouter = require("./routes/home");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const userAPIrouter = require("./routes/newUserAPI");
const loginAPIrouter = require("./routes/loginAPI");
const cookieParser = require("cookie-parser");
const listRout = require("./routes/listRout");
const privateRouter = require("./routes/privateDataRout");
const refreshRouter = require("./routes/refreshRout");
const tasksRouter = require("./routes/tasksRout");
const getTasksRouter = require("./routes/getTasksrout");
const aboutRouter = require("./routes/aboutRout");

const cors = require("cors");
app.use(cors({
    origin: "http://127.0.0.1:3500/login-handle",
    credentials: true
}));

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.use("/", homeRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/register-new-user", userAPIrouter);
app.use("/login-handle", loginAPIrouter);
app.use("/to-do-list", listRout);
app.use("/authorization", privateRouter);
app.use("/authorization-refresh", refreshRouter);
app.use("/save-tasks", tasksRouter);
app.use("/get-tasks", getTasksRouter);
app.use("/about", aboutRouter);

app.use((req, res, next) => {

    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

module.exports = app;