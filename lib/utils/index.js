const cheerio = require('cheerio')
const request = require('request')

const database = require('../service/db')

function crawler (cb) {
//   database.removeAll()
  let options = {
    method: 'GET',
    encoding: 'binary',
    uri: `http://www.nfe.fazenda.gov.br/portal/informe.aspx?ehCTG=false`
  }

  request(options, function (error, response, body) {
    if (error) return cb(error)
    const $ = cheerio.load(body)
    transform($, function (err, info) {
      if (err) return cb(err)

      cb(null, info)
    })
  })
}

function transform ($, cb) {
  let info = {
    numero: $('.divInforme').eq(0).find('a').eq(0).attr('name'),
    titulo: $('.divInforme').eq(0).find('p').eq(0).text().trim().replace(/ {2}/g, '').replace('\n', '').replace('-', '- ').trim()
  }

  database.getAll(function (err, alteracoes) {
    if (err) return cb(err)

    if (alteracoes === undefined || alteracoes.length === 0) {
      return save(info, function (err, saved) {
        if (err) return cb(err)

        cb(null, info)
      })
    }

    if (alteracoes[0].titulo !== info.titulo) {
      save(info, function (err, saved) {
        if (err) return cb(err)

        database.remove(alteracoes[0].numero).then(function (removed) {
          cb(null, info)
        })
        .catch(function (error) {
          cb(error)
        })
      })
    }

    return cb(null, false)
  })
}

function save (alteracao, cb) {
  database.add(alteracao.numero, alteracao, function (err, saved) {
    if (err) return cb(err)

    cb(null, saved)
  })
}

module.exports = {
  crawler
}
