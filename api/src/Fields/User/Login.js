

class Login {

  constructor( app, pg ) {

    app.post('/login', async(req, res, next) => {
      res.sendStatus(200)
    })
  }
}

module.exports = Login;