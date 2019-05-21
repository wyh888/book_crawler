const nodemailer = require('nodemailer')

module.exports = function () {
  let transporter = nodemailer.createTransport({
    service: '163',
    port: 25,
    secureConnection: true,
    auth: {
      user: '18819467659@163.com',
      pass: 'wang6666'
    }
  })

  let mailOptions = {
    from: '"wangyh" <18819467659@163.com>',
    to: '18819467659@163.com',
    subject: '测试邮件',
    html: '<b>hello world<b>'
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info.messageId)
  })
}
