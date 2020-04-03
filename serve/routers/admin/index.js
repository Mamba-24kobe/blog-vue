module.exports = app => {
    const express = require("express")
    const Admins = require('../../modules/admins.js')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams: true
    })
    const authMiddleware = require("../../middleware/auth")

    router.post('/', async(req,res) => {
        let model = await req.module.create(req.body)
        console.log("12",model)
        res.send(model)
    })
    router.get('/', async (req,res) => {
        let model = await req.module.find().populate('parent tags')
        console.log('module',req.params)
        if (req.params.resource === 'tags') {
            console.log('进来')
            model.forEach(m => {
                m.value = m._id
            });
        }
        res.send(model)
    })
    router.get('/:id', async (req,res) => {
        let model = await req.module.findById(req.params.id)
        console.log("21",model)
        res.send(model)
    })
    router.delete('/:id', async (req,res) => {
        let model = await req.module.findByIdAndDelete(req.params.id)
        console.log("25",model)
        res.send(model)
    })
    router.put('/:id', async (req,res) => {
        let model = await req.module.findByIdAndUpdate(req.params.id,req.body)
        console.log("31",model)
        res.send(model)
    })
    app.use('/admin/rest/:resource', authMiddleware(app), async (req, res, next) => {
        console.log(req.params.resource)      
        req.module = require(`../../modules/${req.params.resource}`)
        next()
    }, router)
    const multer = require('multer')
    // const MAO = require('multer-aliyun-oss');
    const localUpload = multer({
        dest: __dirname + '/../../uploads'
    })
  // 以下是阿里云oss云存储相关接口, 为不暴露我个人oss私密账号信息，所以写成汉字，
  // 不填入注册的oss账号信息，跑起来会报错，所以注释
  
    // const upload = multer({
    //     // dest: __dirname + '/../../uploads'
    //     storage: MAO({
    //         config: {
    //             region: '阿里云oss账号对应信息',
    //             accessKeyId: '阿里云oss账号对应信息',
    //             accessKeySecret: '阿里云oss账号对应信息',
    //             bucket: '阿里云oss账号对应信息'
    //         }
    //     })
    // })
    // let OSS = require('ali-oss')
    // let client = new OSS({
    //     region: '阿里云oss账号对应信息',
    //     accessKeyId: '阿里云oss账号对应信息',
    //     accessKeySecret: '阿里云oss账号对应信息',
    //     bucket: '阿里云oss账号对应信息'
    // });
    app.post('/admin/localUpload', authMiddleware(app), localUpload.single('file'), async (req,res) => {
        let file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    // app.post('/admin/upload', authMiddleware(app), upload.single('file'), async (req,res) => {
    //     let file = req.file
    //     res.send(file)
    // })
    // app.get('/admin/ossList', authMiddleware(app), async (req,res) => {
    //     let result = await client.list();
    //     console.log(result)
    //     res.send(result)
    // })
    // app.delete('/admin/ossList/:name', authMiddleware(app), async (req,res) => {
    //     let result = await client.delete(req.params.name);
    //     console.log(result)
    //     res.send(result)
    // })
    app.post('/admin/login',async (req, res) => {
        const {username, password} = req.body
        // 查找用户是否存在
        const user = await Admins.findOne({username: username}).select('+password')
        assert(user, 422, '用户名不存在')
        // if (!user) {
        //     return res.status(422).send({message: '用户名不存在'})
        // }
        // 检验密码是否正确
        const isCheck = require('bcrypt').compareSync(password,user.password)
        assert(isCheck, 422, '密码错误')
        // if (!isCheck) {
        //     return res.status(422).send({message: '密码错误'})
        // }
        // 根据前端的传参生成token，并返回给前端
        let token = jwt.sign({id: user._id},'secret') // 第一个参数是生成token的依据，第二个参数是任意字符串的密钥
        res.send({token,user})
    })
    const sendEmail = require('../../pluglins/sendEmail.js')
    app.post('/admin/email', async (req, res) => {
      console.log(req.body)
      sendEmail(req.body)
      res.send({ok: 'ok'})
    })
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({message: err.message})
    })
}
