const { checkToken } = require("./../../helpers/token")


class Detail {

  constructor( app, pg ) {

    app.get('/post/:uuid', async(req, res, next) => {
      await pg.select("about_id").table("posts").where({ uuid: req.params.uuid}).then((about) => {
        if(about.length > 0) {
          checkToken(666, about[0].about_id, pg, req.headers.authorization, res, async (data) => {
            const uuid = req.params.uuid;
            await pg.select().table('posts').where({uuid: uuid}).then(async (data) => {
              console.log(data)
              if(data.length > 0) { 
                data[0]['media'] = await pg.select('*').table('media').where({uuid: data[0].media_id}).then((data) => data[0])
                data[0]['about'] = await pg.select(['name_first', 'name_last', 'uuid']).table('users').where({uuid: data[0].about_id}).then((data) => data[0])
                data[0]['user'] = await pg.select(['name_first', 'name_last', 'uuid']).table('users').where({uuid: data[0].user_id}).then((data) => data[0])
                data[0]['media'] = await pg.select('*').table('media').where({uuid: data[0].media_id}).then((data) => data[0])
                await pg.select().from('postsPart').where({post_id: uuid}).then((dataParts) => {
                  const response = data[0];
                  response['parts'] = dataParts;
                  console.log(response)
                  res.status(200).send( response )
                })
              } else {
                res.status(200).send({});
              }

            })
          })
        }
      })
    })
  }
}

module.exports = Detail;