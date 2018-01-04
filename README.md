

<p align="center">
  <img src="https://raw.githubusercontent.com/nulldreams/nfe2stalk/master/box.png" alt="Size Limit example"
       width="20%" height="20%">
</p>
<h4 align="center">Um jeito simples de receber as novidades da Sefaz NF-e</h4>
<p align="center">	
  <a href="https://saythanks.io/to/nulldreams">
      <img src="https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg">
  </a>  
	
  <a href="https://github.com/nulldreams/nfe2stalk/issues">
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

## Sites
 - <a href="http://www.iti.gov.br">ITI</a>
 - <a href="http://www.nfe.fazenda.gov.br">SEFAZ</a> 

## Como usar

Atualmente existem dois monitoradores, escolha um e configure o **tempo**, **tipoTempo** e **notificacaoCompleta**.
- `tempo` (tempo entre as consultas, ex: 1, 10, 50. max: 59)
- `tipoTempo` (segundos **s** ou minutos **m**)
- `notificacaoCompleta` (retorna um alerta mesmo que não tenha um novo)

```js
const nfe2stalk = require('nfe2stalk')

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
```

## nfe2stalk.monitor.SITE
Aqui vamos informar qual site o monitorador fará suas consultas
- `nfe2stalk.monitor.iti`
- `nfe2stalk.monitor.sefaz`

## nfe2stalk.monitor.SITE.FUNCTIONS
Aqui serão listadas todas as funções disponíveis para cada site, hoje está padronizado para ambos os sites possuírem as mesmas funções.
- `iniciar`
- `monitorar`
- `limparAlertas`

## iniciar(options)
Inicia o processo das consultas, é necessário informar um objeto seguindo esse modelo:
```json
{
  "tempo": "10",
  "tipoTempo": "s",
  "notificacaoCompleta": true
}
```

## monitorar
Objeto do tipo [Events](https://nodejs.org/api/events.html), a partir dele vamos receber as notificações que o monitorador encontrar
```javascript
nfe2stalk.monitor.sefaz.monitorar.on('alerta', (sefaz) => {
  console.log(sefaz)
})
```
Resultado
```json
{
    "numero": "490",
    "titulo": "22/12/2017 - ATENÇÃO: Comunicamos que a aplicação das validações previstas na NT 2017.001 (GTIN) ocorrerá dentro de janeiro/2017",
    "url": "http://www.nfe.fazenda.gov.br/portal/informe.aspx?ehCTG=false#490"
}
```

## limparAlertas()
Apaga a informação salva, desse modo quando você iniciar o monitorador, ele vai te notificar sobre a ultima noticia do site, independente se você já viu ela.
```javascript
nfe2stalk.monitor.sefaz.limparAlertas().then((qtAlertas) => {
  console.log(`${qtAlertas} removidos`)
})
.catch((err) => {
  console.log(err)
})
```
