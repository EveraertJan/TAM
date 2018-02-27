const { checkToken } = require("./../../helpers/token")

class List {

  constructor( app, pg ) {

    app.get('/post', async(req, res, next) => {
      let user;

      const list = [];

      checkToken(333, null, pg, req.headers.authorization, res, async (decoded) => {
        user = decoded
        await pg.select().table('posts').where({ user_id: decoded.uuid}).then((ownPosts) => {
          list.push(...ownPosts);  
        })

        for(let i = 0; i<user.relations.length; i++) {
          console.log("init", user.relations[i])
          await pg.select().table('posts').where({ about_id: user.relations[i].child}).then((childPosts) => {
            for(let j = 0; j < childPosts.length; j++) {
              if(list.findIndex((item) => { return i.uuid !== childPosts[j].uuid})) {
                list.push(...childPosts);    
              }
            }
          })
        }
        res.send(200, list);
      })
    })
  }
}

module.exports = List;