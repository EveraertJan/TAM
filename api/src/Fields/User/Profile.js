

class Profile {

  constructor( app, pg ) {

    app.get('/profile', async(req, res, next) => {
      res.sendStatus(200)
    })
  }
}

module.exports = Profile;