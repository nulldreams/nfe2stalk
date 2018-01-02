

<p align="center">
  <img src="https://raw.githubusercontent.com/nulldreams/nfe2stalk/master/box.png" alt="Size Limit example"
       width="20%" height="20%">
</p>
<h4 align="center">Um jeito mais simples de receber as novidades da Sefaz NF-e</h4>
<p align="center">
  <a href="https://gitter.im/simple-apis/node-bank"><img src="https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg"></a>
	
  <a href="https://saythanks.io/to/nulldreams">
      <img src="https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg">
  </a>  
	
  <a href="https://github.com/nulldreams/node-bank/issues">
      <img src="https://img.shields.io/codeclimate/issues/github/me-and/mdf.svg">
  </a>

  <a href="http://makeapullrequest.com">
      <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>
<p align="center">
 <a href="https://nodei.co/npm/nfe2stalk/">
  <img src="https://nodei.co/npm/nfe2stalk.png?downloads=true&downloadRank=true&stars=true" alt="Size Limit example">
 </a>
</p>

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
