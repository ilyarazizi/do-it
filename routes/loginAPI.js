const express = require("express");
const loginHandler = require("./../controllers/loginController");
const router = express.Router();

router.post("/", loginHandler);

module.exports = router;