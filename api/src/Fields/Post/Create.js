const uuidV1 = require('uuid/v1');


class Create {

  constructor( app, pg ) {

    app.put('/post', async(req, res, next) => {
      const insert = req.body;
      insert['uuid'] = uuidV1();
      await pg.insert(insert).into('posts').then(function(results) {
        res.json({ uuid: insert['uuid'] });
      });
    })
    app.put('/post/:uuid', async(req, res, next) => {
      const uuid = req.params.uuid;

      const insert = req.body;
      insert['uuid'] = uuidV1();
      insert['post_id'] = uuid;
      await pg.insert(insert).into('postsPart').then(function(results) {
        res.json({ uuid: insert['uuid'] });
      });
    })
  }
}

module.exports = Create;