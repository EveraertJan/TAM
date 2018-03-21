const uuidV1 = require('uuid/v1');
const config = require("./../../config.js");
const jwt = require("jwt-simple");
const fs = require("fs");

const { checkToken } = require("./../../helpers/token")

class Edit {

  constructor( app, pg ) {

    app.put('/user',  async (req, res, next) => {
      checkToken(777, null, pg, req.headers.authorization, res, async (user) => {

        const data = {
          name_first: req.body.name_first,
          name_last: req.body.name_last,
          usermail: req.body.usermail,
          date_of_birth: req.body.date_of_birth,
          media_id: req.body.media_id
        }
        await pg.update(data).table("users").where({uuid: user.uuid}).returning(['name_first', 'name_last', 'usermail', 'media_id', 'uuid']).then(async (data) => {
          // fs.mkdir('/tam/uploads/' + uuid);
          const user = data[0];
          user['media'] = await pg.select(['uuid', 'url', 'type']).table('media').then((image) => image[0]);

          res.send(200, user);
        }).catch((error) => {
          res.send(401, error);
        });
      })
    })
  }
}

module.exports = Edit;