const uuidV1 = require('uuid/v1');
const { checkToken } = require("./../../helpers/token")


class Create {

  constructor( app, pg ) {

    app.post('/tags', async(req, res, next) => {

      checkToken(111, req.body.about_id, pg, req.headers.authorization, res, async (data) => {

        const insert = req.body;
        insert['uuid'] = uuidV1();
        insert["user_id"] = data.uuid;

        await pg.insert(insert).into('tags').returning('*').then(function(results) {
          res.status(200).send(results[0]);
        }).catch((error) => {
          console.log(error);
          res.status(400).send(error);
        })
      });
    })

    app.post('/tags/apply/:uuid', async(req, res, next) => {

      checkToken(111, req.body.about_id, pg, req.headers.authorization, res, async (data) => {

        const insert = req.body;
        insert['uuid'] = uuidV1();
        insert["post_id"] = req.params.uuid;

        await pg.insert(insert).into('tagsPivot').returning('*').then(function(results) {
          res.status(200).send(results[0]);
        }).catch((error) => {
          console.log(error);
          res.status(400).send(error);
        })
      });
    })
  }

}

module.exports = Create;