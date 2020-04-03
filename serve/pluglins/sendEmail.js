/**
 *
 * @Description 邮件发送 
 * 调用方法:sendMail('amor_zhang@qq.com','这是测试邮件', 'Hi Amor,这是一封测试邮件');
 * @Author Amor
 * @Created 2016/04/26 15:10
 * 技术只是解决问题的选择,而不是解决问题的根本...
 * 我是Amor,为发骚而生!
 *
 */
 
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = {
  email: {
    service: 'QQ', // 邮箱类别，我固定QQ
    user: '自己的QQ邮箱',
    pass: '自己去QQ邮箱申请授权码',
}
}
 
sendSmtpTransport = nodemailer.createTransport(smtpTransport({
    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
}));
 
/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
var sendMail = function (replyObj) {
 
  sendSmtpTransport.sendMail({
        from: config.email.user,
        to: replyObj.recipient,
        subject: `${replyObj.subject} 你好! 你有新邮件了, 请查收`,
        html: replyObj.html
 
    }, function (error, response) {
        if (error) {
            console.log(error);
        }
        console.log('发送成功')
    });
}
 
module.exports = sendMail;