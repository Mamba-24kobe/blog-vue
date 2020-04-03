module.exports = app => {
  const express = require("express")
  const router = express.Router({
    mergeParams: true
  })
  const Blogs = require("../../modules/blogs")
  const Comments = require("../../modules/comments")
  const Users = require("../../modules/users")
  const Messages = require("../../modules/messages")
  const Friends = require("../../modules/friends")
  const Tags = require("../../modules/tags")

  router.post('/web/blogs', async (req, res) => {
    let model = await Blogs.create(req.body)
    console.log("12", model)
    res.send(model)
  })
  router.post('/web/blogs/:pageNum/:pageSize', async (req, res) => {
    let model = {}
    let skip = (req.params.pageNum - 1) * req.params.pageSize
    if (req.body.tags) {
      model.total = await Blogs.count({tags: req.body.tags})
      model.rows = await Blogs.find(
        // {tags: req.body.tags},
        // {},
          // {
          //   sort: {
          //     createdAt: -1, //倒序 desc
          //   },
          //   skip: skip,//page : 当前页码, pageSize 每页显示条数
          //   limit: Number(req.params.pageSize)
          // }
        ).where({tags: req.body.tags}).populate('tags').skip(skip).sort({createdAt: -1,}).limit(Number(req.params.pageSize))
    } else {
      model.total = await Blogs.count()
      model.rows = await Blogs.find(
        ).populate('tags').skip(skip).sort({createdAt: -1,}).limit(Number(req.params.pageSize))
    }


    res.send(model)
  })
  router.get('/web/blogs/:id', async (req, res) => {
    let model = await Blogs.findById(req.params.id).lean()
    model.related = await Blogs.find().where({
      tags: { $in: model.tags }
    }).limit(2)
    await Blogs.update({_id : req.params.id}, {$inc : {views : 1}})

    console.log("21", model)
    res.send(model)
  })
  router.get('/web/tags', async (req, res) => {
    let model = await Tags.find()
    model.forEach(m => {
        m.value = m._id
    });
    res.send(model)
  })
  router.delete('/web/blogs/:id', async (req, res) => {
    let model = await Blogs.findByIdAndDelete(req.params.id)
    console.log("25", model)
    res.send(model)
  })
  router.put('/web/blogs/:id', async (req, res) => {
    let model = await Blogs.findByIdAndUpdate(req.params.id, req.body)
    console.log("31", model)
    res.send(model)
  })
  router.put('/web/blogs/likes/:id', async (req, res) => {
    let model = await Blogs.findByIdAndUpdate(req.params.id, 
      // { likes: req.body.likes },
      {$inc : {likes : 1}}
    )
    console.log("31", model)
    res.send(model)
  })
  router.post('/web/users', async (req, res) => {
    let model = await Users.create(req.body)
    console.log("12", model)
    res.send(model)
  })
  router.get('/web/users', async (req, res) => {
    let model = await Users.find()
    console.log("12", model)
    res.send(model)
  })
  router.put('/web/users/:id', async (req, res) => {
    let model = await Users.findByIdAndUpdate(req.params.id,req.body)
    console.log("12", model)
    res.send(model)
  })
  router.get('/web/users/:id', async (req, res) => {
    let model = await Users.findById(req.params.id)
    console.log("12", model)
    res.send(model)
  })
  const sendEmail = require('../../pluglins/sendEmail.js')
  router.post('/web/email', async (req, res) => {
    console.log(req.body)
    sendEmail(req.body)
    res.send({ok: 'ok'})
  })
  router.post('/web/comments', async (req, res) => {
    let model = await Comments.create(req.body)
    await Blogs.findByIdAndUpdate(req.body.relateBlogId, 
      // { msgs: req.body.msgs },
      {$inc : {msgs : 1}}
      )
    console.log("12", model)
    res.send(model)
  })
  router.get('/web/comments/:blogsId', async (req, res) => {
    const comments = await Comments.find().where({ relateBlogId: req.params.blogsId })
    console.log(comments)
    res.send(comments)
  })
  router.post('/web/messages', async (req, res) => {
    let model = await Messages.create(req.body)
    console.log("12", model)
    res.send(model)
  })
  router.get('/web/messages', async (req, res) => {
    // console.log("123",await Blogs.findOne({
    //     _id: req.params.blogsId}))
    const messages = await Messages.find()
    console.log(messages)
    res.send(messages)
  })
  router.post('/web/friends', async (req, res) => {
    let model = await Friends.create(req.body)
    console.log("12", model)
    res.send(model)
  })
  router.get('/web/friends', async (req, res) => {
    let model = await Friends.find()
    console.log("12", model)
    res.send(model)
  })
  router.put('/web/friends/:id', async (req, res) => {
    let model = await Friends.findByIdAndUpdate(req.params.id,req.body)
    console.log("12", model)
    res.send(model)
  })
  const multer = require('multer')
  const MAO = require('multer-aliyun-oss');
  // 以下是阿里云oss云存储相关接口, 为不暴露我个人oss私密账号信息，所以写成汉字，
  // 不填入注册的oss账号信息，跑起来会报错，所以注释

  // const upload = multer({
  //   // dest: __dirname + '/../../uploads'
  //   storage: MAO({
  //     config: {
  //       region: '阿里云oss账号对应信息',
  //       accessKeyId: '阿里云oss账号对应信息',
  //       accessKeySecret: '阿里云oss账号对应信息',
  //       bucket: '阿里云oss账号对应信息'
  //     }
  //   })
  // })
  // router.post('/web/upload', upload.single('file'), async (req, res) => {
  //   let file = req.file
  //   res.send(file)
  // })
  router.get('/web/time', async (req, res) => {
    let time = new Date().getTime()
    console.log('time',time)
    res.send({'data': time})
  })
  app.use(router)
}
