const mongoose = require('mongoose');

let conn = null
const URI = 'mongodb+srv://nikov-dev-week:UiONgchmq3vRctpK@cluster0.xhtam.mongodb.net/<dbname>?retryWrites=true&w=majority'

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
