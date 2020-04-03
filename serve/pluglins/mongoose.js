module.exports = app => {
    const mongoose = require("mongoose")
    mongoose.connect("mongodb://127.0.0.1:27017/blogs",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    // var db = mongoose.connection;
    // db.on('error', console.error.bind(console, 'connection error:'));
    // db.once('open', function() {
    //   // we're connected!
    // });
}