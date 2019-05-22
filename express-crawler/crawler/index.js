const schedule = require('node-schedule')
const crawler = require('./crawler')
const rule = '30 30 14 * * *'

const scheduleCrawler = () => {
  schedule.scheduleJob(rule, () => {
    crawler()
  })
}

module.exports = scheduleCrawler