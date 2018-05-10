const { checkToken } = require("./../../helpers/token")

class List {

  constructor( app, pg ) {

    app.get('/tags', async(req, res, next) => {
      checkToken(111, null, pg, req.headers.authorization, res, async (decoded) => {
        user = decoded
        await pg.select().table('tags').orderBy('created_at', 'DESC').where({ user_id: decoded.uuid}).then(async (ownTags) => {
          res.send(ownTags)
        }).catch((error) => {
          res.status(400).send(error)
        })
      })
    })

  }
}

module.exports = List;