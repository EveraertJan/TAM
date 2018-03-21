const { checkToken } = require("./../../helpers/token")
const uuidV1 = require('uuid/v1');
const jwt = require("jwt-simple");
const config = require("./../../config.js");


class Detail {

  constructor( app, pg ) {


    app.get('/user/:uuid', async(req, res, next) => {
      checkToken(777, req.params.uuid, pg, req.headers.authorization, res, async (data) => {
        const user = await pg.select(['users.name_first', 'users.name_last', 'users.uuid', 'users.created_at', 'users.date_of_birth', 'users.usermail', 'media.url']).table('users').leftJoin('media', 'media.uuid', 'users.media_id').where({'users.uuid': req.params.uuid}).then((data) => data[0]);
        user['info'] = await pg.select(['weight', 'length', 'place', 'time']).table('userInfo').where({user_id: user['uuid']}).then((data) => data[0]);
        user['admins'] = await pg.select(['users.name_first', 'users.name_last', 'users.uuid', 'media.url']).table('relations').where({child: req.params.uuid}).leftJoin('users', 'users.uuid', 'relations.parent').leftJoin('media', 'media.uuid', 'users.media_id').then(async (parents) => parents)
        res.send(user)
      })
    })
  }
}

module.exports = Detail;