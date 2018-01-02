# nfe2stalk
[![npm package](https://nodei.co/npm/nfe2stalk.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nfe2stalk/)

## Como usar

Precisamos configurar apenas o tempo que a lib vai consultar a Sefaz e se queremos receber uma mensagem mesmo quando não tiver nenhuma informação nova.

```js
const nfe2stalk = require('nfe2stalk')

let options = {
  every: '10',
  fullNotify: true
}

nfe2stalk.monitor.iniciar(options)

nfe2stalk.monitor.monitorar.on('alerta', (alerta) => {
  console.log('Notificação da sefaz:')
  console.log(alerta)
  console.log('------------------------------------')
})
```

Resultado
```
Notificação da sefaz:
{ numero: '490',
  titulo: '22/12/2017 - ATENÇÃO: Comunicamos que a aplicação das validações previstas na NT 2017.001 (GTIN) ocorrerá dentro de janeiro/2017',
  url: 'http://www.nfe.fazenda.gov.br/portal/informe.aspx?ehCTG=false#490' }
------------------------------------
Notificação da sefaz:
false
------------------------------------
```
