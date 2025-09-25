const mongoose = require("mongoose");

async function connectToDb() {

    try {
        await mongoose.connect(process.env.DATABASE_URL);

    } catch(err) {

        console.error(err);
    }
    
}

module.exports = connectToDb;