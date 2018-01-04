const nfe2stalk = require('../lib/nfe2stalk')

let options = {
  tempo: '10',
  tipoTempo: 's',
  notificacaoCompleta: true
}

nfe2stalk.monitor.iti.iniciar(options)
nfe2stalk.monitor.sefaz.iniciar(options)

nfe2stalk.monitor.iti.monitorar.on('alerta', (iti) => {
  console.log('iti')
  console.log(iti)
  console.log('------------------------------------')
})

nfe2stalk.monitor.sefaz.monitorar.on('alerta', (sefaz) => {
  console.log('sefaz')
  console.log(sefaz)
  console.log('------------------------------------')
})

// nova versão

nfe2stalk.monitor.iti.limparAlertas().then((qtAlertas) => {
  console.log(`${qtAlertas} removidos`)
})
.catch((err) => {
  console.log(err)
})

nfe2stalk.monitor.sefaz.limparAlertas().then((qtAlertas) => {
  console.log(`${qtAlertas} removidos`)
})
.catch((err) => {
  console.log(err)
})
