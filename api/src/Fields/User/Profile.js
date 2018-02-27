const { checkToken } = require("./../../helpers/token")


class Profile {

  constructor( app, pg ) {

    app.get('/profile', async(req, res, next) => {
      checkToken(777, null, pg, req.headers.authorization, res, (data) => {
        res.send(200, data)
      })
    })

    app.post('/relation', async(req, res, next) => {
      checkToken(777, req.body.child_id, pg, req.headers.authorization, res, (data) => {
        res.send(200, data)
      })
    })

    app.get('/userInfo', async(req, res, next) => {
      checkToken(777, req.body.child_id, pg, req.headers.authorization, res, (data) => {
        if(req.body.user_id === data.children)

        res.send(200, data)
      })
    })
  }
}

module.exports = Profile;