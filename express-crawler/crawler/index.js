const schedule = require('node-schedule')
const rule = new schedule.RecurrenceRule()
const times = [0, 10, 20, 30, 40, 50]
rule.second = times

module.exports = function () {
  schedule.scheduleJob(rule, function () {
    console.log('执行任务')
  })
}
