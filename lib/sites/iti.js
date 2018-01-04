const schedule = require('node-schedule')
const util = require('../utils/iti')
const EventEmitter = require('events')
var alerta = false

class MyEmitter extends EventEmitter {}

const monitorar = new MyEmitter()

function verificarTempo (options) {
  if (options.tipoTempo === 's') { return `*/${options.tempo} * * * * *` }

  if (options.tipoTempo === 'm') { return `*/${options.tempo} * * * *` }
}

function iniciar (options) {
  let j = schedule.scheduleJob(verificarTempo(options), function () {
    util.crawler(function (err, info) {
      if (err) {
        return monitorar.emit('alerta', err)
      }
      if (info.numero) {
        alerta = info
        return monitorar.emit('alerta', alerta)
      }

      if (options.notificacaoCompleta && !info) {
        alerta = false
        return monitorar.emit('alerta', alerta)
      }
    })
  })
}

function limparAlertas () {
  return new Promise((resolve, reject) => {
    util.clear().then((qtAlertas) => {
      resolve(qtAlertas)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

module.exports = {
  iniciar,
  alerta,
  monitorar,
  limparAlertas
}
