const cheerio = require('cheerio')
const request = require('request')

const database = require('../service/iti')

function crawler (cb) {
  let options = {
    method: 'GET',
    encoding: 'utf-8',
    uri: `http://www.iti.gov.br/noticias/indice-de-noticias`
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
  let url = $('.tileItem').eq(0).find('a').eq(0).attr('href')

  let info = {
    numero: url.substring(29, 33),
    titulo: $('.tileItem').eq(0).find('.description').eq(0).text().trim(),
    url: `http://www.iti.gov.br/noticias/indice-de-noticias${url}`
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

function clear () {
  return new Promise((resolve, reject) => {
    database.removeAll().then((numRemoved) => {
      resolve(numRemoved)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

function save (alteracao, cb) {
  database.add(alteracao.numero, alteracao, function (err, saved) {
    if (err) return cb(err)

    cb(null, saved)
  })
}

module.exports = {
  crawler,
  clear
}
