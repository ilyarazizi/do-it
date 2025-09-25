const exrpess = require("express");
const router = exrpess.Router();
const path = require("path");


router.get("/", (req, res) => {

    res.sendFile(path.join(__dirname,".." ,"views", "to-do-list.html"));
});

module.exports = router;