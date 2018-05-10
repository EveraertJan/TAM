const { checkToken } = require("./../../helpers/token")


class Delete {

  constructor( app, pg ) {

    app.delete('/tags/:uuid', async(req, res, next) => {
      checkToken(333, null, pg, req.headers.authorization, res, async (user) => {
        const uuid = req.params.uuid;
        await pg('tags').delete().where({uuid: req.params.uuid, user_id: user.uuid}).returning('id').then(async (data) => {
          if(data.length > 0) { res.send(200) }
            else { res.send(400, { error: "already gone"})}
        }).catch((error) => {
          res.send(500, error)
        })
      })
    })
  }
}

module.exports = Delete;