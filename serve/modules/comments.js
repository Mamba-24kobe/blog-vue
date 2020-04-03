const mongoose  = require("mongoose")
const schema = new mongoose.Schema({
    nickName:{type: String},
    avatarImg: {type: String},
    content: {type: String},
    userId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Users'},
    relateBlogId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Blogs'},
    parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Comments'},
    byAiteName:{type: String},
},{
    timestamps: true
})
module.exports = mongoose.model('Comments', schema)