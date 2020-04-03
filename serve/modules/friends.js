const mongoose  = require("mongoose")
const schema = new mongoose.Schema({
    nickName:{type: String},
    email: {type: String},
    url: {type: String},
    description: {type: String},
    avatarImg: {type: String},
    isPass: {type: Boolean, default: false},

},{
    timestamps: true
})
module.exports = mongoose.model('Friends', schema)