const mongoose = require('mongoose');

let conn = null
const URI = 'your link from MongoDB Atlas';

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
