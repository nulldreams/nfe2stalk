const schedule = require('node-schedule')
const util = require('./utils')
const EventEmitter = require('events')
var alerta = false

class MyEmitter extends EventEmitter {}

const monitorar = new MyEmitter()

function iniciar (options) {
  // return new Promise((resolve, reject) => {

  let j = schedule.scheduleJob(`*/${options.every} * * * * *`, function () {
    util.crawler(function (err, info) {
      if (err) {
        return monitorar.emit('alerta', err)
      }
        // console.log(info)
      if (info.numero) {
        info.url = `http://www.nfe.fazenda.gov.br/portal/informe.aspx?ehCTG=false#${info.numero}`
        alerta = info
        return monitorar.emit('alerta', alerta)
      }

      if (options.fullNotify && !info) {
        alerta = false
        return monitorar.emit('alerta', alerta)
      }

      alerta = info
      monitorar.emit('alerta', alerta)
    })
  })
  // })
}

module.exports = {
  iniciar,
  alerta,
  monitorar
}
