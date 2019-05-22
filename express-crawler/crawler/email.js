const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: '163',
  port: 25,
  secureConnection: true,
  auth: {
    user: '',
    pass: ''
  }
})

const sendMail = (subject, content) => {
  let mailOptions = {
    from: '',
    to: '18819467659@163.com',
    subject: `道君新更新章节：${subject}`,
    html: content
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info.messageId)
  })
}

module.exports = sendMail
