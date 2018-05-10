const { checkToken } = require("./../../helpers/token")

class List {

  constructor( app, pg ) {

    app.get('/post', async(req, res, next) => {
      let user;
      const list = [];
      checkToken(333, null, pg, req.headers.authorization, res, async (decoded) => {
        user = decoded
        await pg.select().table('posts').orderBy('created_at', 'DESC').where({ user_id: decoded.uuid}).then(async (ownPosts) => {
          list.push(...ownPosts);  
          for(let i = 0; i<user.admin_of.length; i++) {
            await pg.select().table('posts').orderBy('created_at', 'DESC').where({ about_id: user.admin_of[i].uuid}).then(async (childPosts) => {
              for(let j = 0; j < childPosts.length; j++) {
                if(list.findIndex((item) => { return i.uuid !== childPosts[j].uuid})) {
                  list.push(...childPosts);    
                }
              }
              for(let k = 0; k < list.length; k++) {
                if(list[k].media_id !== null ) {
                  list[k]['media'] = await pg.select('*').table('media').where({uuid: list[k].media_id}).then((data) => { return data[0] })
                }
                list[k]['tags'] = await pg.select(['tags.title', 'tags.uuid']).table('tagsPivot').innerJoin('tags', 'tagsPivot.tag_id', 'tags.uuid').where('tagsPivot.post_id', list[k].uuid ).then((data) => { return data })
                console.log('- uuid', list[k].user_id)
                list[k]['by'] = await pg.select(['users.name_first', 'users.name_last', 'users.uuid', 'media.url']).table('users').leftJoin('media', 'media.uuid', 'users.media_id').where('users.uuid', list[k].user_id).then((data) => { return data[0] })
              }
              res.send(200, list);
            }).catch((error) => {
              res.status(400).send(error)
            })
          }
        }).catch((error) => {
          res.status(400).send(error)
        })
      })
    })

    app.get('/post/user/:uuid', async(req, res, next) => {
      let user;
      console.log(req.params)

      const list = [];
      checkToken(333, req.params.uuid, pg, req.headers.authorization, res, async (decoded) => {
        user = decoded
        await pg.select().table('posts').orderBy('created_at', 'DESC').where({ user_id: req.params.uuid}).orWhere({about_id: req.params.uuid}).then(async (posts) => {
          list.push(...posts);
          for(let k = 0; k < list.length; k++) {
            if(list[k].media_id !== null ) {
              list[k]['media'] = await pg.select('*').table('media').where({uuid: list[k].media_id}).then((data) => { return data[0] })
            }
            list[k]['by'] = await pg.select(['name_first', 'name_last', 'uuid']).table('users').where({uuid: list[k].user_id}).then((data) => { return data[0] })
          }
          res.send(200, list);
        }).catch((error) => {
          res.status(400).send(error)
        })
      })
    })
  }
}

module.exports = List;