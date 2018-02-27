const uuidV1 = require('uuid/v1');
const { checkToken } = require("./../../helpers/token")


class Create {

  constructor( app, pg ) {

    app.post('/post', async(req, res, next) => {

      checkToken(666, req.body.about_id, pg, req.headers.authorization, res, async (data) => {

        const insert = req.body;
        insert['uuid'] = uuidV1();
        insert["user_id"] = data.uuid;
        await pg.insert(insert).into('posts').then(function(results) {
          res.json({ uuid: insert['uuid'] });
        });
      });
    })
    app.put('/post/:uuid', async(req, res, next) => {
      await pg.select("about_id").table("posts").where({uuid: req.params.uuid}).then((post) => {
        if(post.length > 0) {
          checkToken(666, post[0].about_id, pg, req.headers.authorization, res, async (data) => {
            const insert = req.body;
            insert['uuid'] = uuidV1();
            insert['post_id'] = req.params.uuid;
            await pg.insert(insert).into('postsPart').then(function(results) {
              res.json({ uuid: insert['uuid'] });
            });
          });
        }
      })
    })
  }
}

module.exports = Create;