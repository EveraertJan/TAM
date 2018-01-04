

class Register {

  constructor( app, pg ) {

    app.get('/register', async(req, res, next) => {
      res.sendStatus(200)
    })
    app.post('/register', async(req, res, next) => {
      res.sendStatus(200)
    })
  }
}

module.exports = Register;