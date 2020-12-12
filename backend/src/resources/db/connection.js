const mongoose = require('mongoose');

let conn = null
const URI = process.env.MONDODB_URI_ACCESS;

module.exports = async () => {
    if (!conn) {
        conn = mongoose.connect(URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });

        await conn;
    }
};
