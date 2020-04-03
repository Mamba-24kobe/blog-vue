const mongoose = require("mongoose")
const Schmea = new mongoose.Schema({
    label: { type: String },
    // parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Tags'},
    value: { type: String }

})
module.exports = mongoose.model('Tags',Schmea)