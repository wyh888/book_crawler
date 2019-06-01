const schedule = require('node-schedule')
const crawler = require('./crawler')
const rule = new schedule.RecurrenceRule()
rule.hour = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23]

const scheduleCrawler = () => {
  schedule.scheduleJob(rule, () => {
    crawler()
  })
}

module.exports = scheduleCrawler