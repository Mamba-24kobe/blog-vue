module.exports = app => {
    return async (req,res,next) => {
        const Admins = require('../modules/admins.js')
        const jwt = require('jsonwebtoken')
        const assert = require('http-assert')
        console.log(req.headers.token)
        // req.headers.token = undefined split方法会报错， 所以 req.headers.token || ''
        let token = (req.headers.token || '').split(" ").pop()
        console.log(token,'token')
        assert(token, 422, '请登陆')
        let {id} = jwt.verify(token,'secret')
        assert(id, 422, '请登陆')
        req.user = await Admins.findById(id)
        assert(req.user, 422, '请登陆')
        console.log(req.user)
        await next()
    }
}