const path = require('path')
const Datastore = require('nedb')

const db = new Datastore({
  filename: path.join(__dirname, '..', 'data', `informacoes.db`)
})

db.loadDatabase()
db.persistence.setAutocompactionInterval(1000 * 60 * 1)

function get (id, callback) {
  db.findOne({
    _id: id
  }, callback)
}

function getAll (callback) {
  db.find({}, callback)
}

function add (id, alteracao, cb) {
  this.get(id, (err, alteracoes) => {
    if (err) return cb(err)

    if (!alteracoes) {
      return db.insert({
        _id: id,
        alteracoes: [alteracao]
      }, (err, success) => {
        if (err) return cb(err)
        cb(null, success)
      })
    }
  })
}

function remove (id) {
  return new Promise((resolve, reject) => {
    db.remove({
      _id: id
    }, (err, removido) => {
      if (err) return reject(err)

      resolve(removido)
    })
  })
}

function removeAll () {
  db.remove({}, { multi: true }, function (err, numRemoved) {
    console.log(numRemoved)
  })
}

module.exports = {
  get,
  getAll,
  add,
  remove,
  removeAll
}
