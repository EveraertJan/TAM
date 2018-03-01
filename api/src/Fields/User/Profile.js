const { checkToken } = require("./../../helpers/token")
const uuidV1 = require('uuid/v1');


class Profile {

  constructor( app, pg ) {

    app.get('/profile', async(req, res, next) => {
      checkToken(777, null, pg, req.headers.authorization, res, (data) => {
        res.send(200, data)
      })
    })

    app.post('/relation', async(req, res, next) => {
      // TODO:  check if exists
      checkToken(777, req.body.child, pg, req.headers.authorization, res, async (data) => {
        await pg.insert({
          call: req.body.call,
          parent: req.body.parent,
          child: req.body.child,
          rights: req.body.rights,
          status: 1,
          uuid: uuidV1()
        }).table("relations").returning("*").then((data) => {
          res.send(200, data)
        }).catch((error) => {
          res.send(400, error)
        })
      })
    })

    app.put('/userInfo', async(req, res, next) => {
      checkToken(777, req.body.user_id, pg, req.headers.authorization, res, async (data) => {
        const insert = req.body;
        insert["uuid"] = uuidV1();
        //add where not exist
        await pg.select().table("userInfo").where({user_id: req.body.user_id}).then(async (data) => {
          if(data.length == 0) {
            await pg.insert(insert).into("userInfo").returning("*").then((result) => {
              res.send(200, result)
            }).catch((error) => {
              res.send(400, error);
            })
          } else {
            await pg.update(insert).into("userInfo").where({user_id: req.body.user_id}).returning("*").then((result) => {
              res.send(200, result)
            }).catch((error) => {
              res.send(400, error);
            })
          }

        })
        
      })
    })
  }
}

module.exports = Profile;