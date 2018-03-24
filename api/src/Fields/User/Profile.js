const { checkToken } = require("./../../helpers/token")
const uuidV1 = require('uuid/v1');
const jwt = require("jwt-simple");
const config = require("./../../config.js");


class Profile {

  constructor( app, pg ) {

    app.get('/profile', async(req, res, next) => {
      checkToken(777, null, pg, req.headers.authorization, res, (data) => {
        res.send(200, data)
      })
    })

    app.get('/relation/:childId', async(req, res, next) => {
      checkToken(777, req.params.childId, pg, req.headers.authorization, res, async (data) => {
        await pg.select("*").table('relations').where({child: req.params.childId}).then(async(relations) => {
          const adminList = []
          console.log('relations', relations)
          for(let i = 0; i<relations.length; i++) {
            await pg.select(['name_first', 'name_last', 'usermail', 'uuid']).table('users').where({uuid: relations[i].parent}).then((user) => {
              user[0]['call'] = relations[i].call;
              adminList.push(user[0]);
            })
          }
          res.send(200, adminList);
        }).catch((error) => {
          res.send(400, error)
        })

      });
    })

    app.post('/relation', async(req, res, next) => {
      // TODO:  check if exists
      console.log(req.body)
      checkToken(777, req.body.child, pg, req.headers.authorization, res, async (data) => {
        
        const userExists = await pg.select(['usermail', 'uuid']).table('users').where('usermail', req.body.usermail).then((data) => { 
          if(data.length > 0) { return data[0] } 
            else { return false }
        })

        console.log(userExists) 

        if(userExists.uuid) {
          await pg.insert({
            call: req.body.call,
            parent: userExists['uuid'],
            child: req.body.child,
            rights: 333,
            status: 0,
            uuid: uuidV1()
          }).table("relations").returning("*").then((data) => {
            res.send(200, userExists)
          }).catch((error) => {
            res.send(400, error)
          })
        } else {
          // create user
          // TODO: generate pass
          const newUser = {
            uuid: uuidV1(),
            usermail: req.body.usermail,
            password: 'test',
            name_first: req.body.name_first,
            name_last: req.body.name_last
          }

          await pg.insert(newUser).table('users').returning('*').then(async(parent) => {
            
            await pg.insert({
              call: req.body.call,
              parent: parent[0]['uuid'],
              child: req.body.child,
              rights: 333,
              status: 0,
              uuid: uuidV1()
            }).table("relations").returning("*").then((data) => {
              res.send(200, parent[0])
            }).catch((error) => {
              res.send(400, error)
            })
          }).catch((error) => {
            res.send(400, error)
          })
        }


      })
    })

    app.put('/userInfo', async(req, res, next) => {
      checkToken(777, req.body.user_id, pg, req.headers.authorization, res, async (data) => {
        const insert = req.body;
        insert["uuid"] = uuidV1();
        //add where not exist
        await pg.select().table("userInfo").where({user_id: req.body.user_id}).then(async (data) => {
          if(data.length == 0) {
            await pg.insert(insert).into("userInfo").returning("*").then( async (result) => {
            res.send(200, result[0])
            }).catch((error) => {
              res.send(400, error);
            })
          } else {
            await pg.update(insert).into("userInfo").where({user_id: req.body.user_id}).returning("*").then((result) => {
              res.send(200, result[0])
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