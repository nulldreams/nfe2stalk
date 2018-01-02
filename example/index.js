const nfe2stalk = require('../lib/nfe2stalk')

let options = {
  every: '10',
  fullNotify: true
}

nfe2stalk.monitor.iniciar(options)

nfe2stalk.monitor.monitorar.on('alerta', (alerta) => {
  console.log('alerta')
  console.log(alerta)
  console.log('------------------------------------')
})
