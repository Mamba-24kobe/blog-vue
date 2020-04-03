const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    content: {type: String},
    imgUrl: {type: String},
    tags: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Tags'}],
    author: {type: String},
    time: {type: String},
    likes: {type: Number,default: 0},
    msgs: {type: Number,default: 0},
    views:{type: Number,default: 0},
},{
    timestamps: true
})
// schema.virtual('commentsList', {
//     localField: '_id',
//     foreignField: 'relateBlogId',
//     justOne: false,
//     ref: 'Comments'
// })
module.exports = mongoose.model('Blogs',schema)