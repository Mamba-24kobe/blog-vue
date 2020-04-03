const mongoose  = require("mongoose")
const schema = new mongoose.Schema({
    nickName:{type: String},
    avatarImg: {type: String},
    content: {type: String},
    userId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Users'},
    parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Messages'},
    byAiteName:{type: String},
},{
    timestamps: true
})
module.exports = mongoose.model('Messages', schema)