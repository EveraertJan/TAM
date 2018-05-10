const uuidV1 = require('uuid/v1');
const config = require("./../../config.js");
const jwt = require("jwt-simple");
const fs = require("fs");

const { checkToken } = require("./../../helpers/token")

class Register {

  constructor( app, pg ) {

    app.post('/register',  async (req, res, next) => {
      const uuid = uuidV1();
      const data = {
        name_first: req.body.name_first,
        name_last: req.body.name_last,
        usermail: req.body.usermail,
        password: req.body.password,
        date_of_birth: req.body.date_of_birth,
        uuid: uuid
      }
      await pg.select("usermail").table("users").where({usermail: req.body.usermail}).then(async (result) => {
        if(result.length > 0) {
          res.send(400, {error: 'already exists'})
        } else {
          await pg.insert(data).table("users").then((data) => {
            fs.mkdir('/tam/uploads/' + uuid);
            res.send(200, {uuid: uuid});
          }).catch((error) => {
            res.send(401, error);
          });
        }
      })

    })


    app.post('/registerChild',  async (req, res, next) => {
      checkToken(777, null, pg, req.headers.authorization, res, async (user) => {
        console.log(user)
        const uuid = uuidV1();
        const url = (req.body.media_id ? req.body.media_id : '#')
        const data = {
          name_first: req.body.name_first,
          name_last: req.body.name_last,
          uuid: uuid,
          password: 'temp',
          date_of_birth: req.body.date_of_birth,
          media_id: req.body.media_id 
        }
        await pg.insert(data).table("users").returning('*').then(async (data) => {
          await pg.insert({
            parent: user.uuid,
            child: uuid,
            rights: 777,
            status: 0,
            call: req.body.call,
            uuid: uuidV1()
          }).table("relations").then(async () => {
            const expiresAt = JSON.stringify(new Date().getTime() + 3*24*60*60*1000);

            const relations = await pg.select("*").table("relations").where({parent: user.uuid}).then(async (relations) => {
              for(let i = 0; i < relations.length; i++ ){
                await pg.select("name_first", "name_last").from("users").where({uuid: relations[i].child}).then(async (child) => {
                  const childInfo = {
                    name_first: child[0].name_first,
                    name_last: child[0].name_last,
                    call: relations[i].call,
                    uuid: child[0].uuid
                  }
                  user.admin_of.push(childInfo);
                })
              }
              const token = jwt.encode({ 
                usermail: user['usermail'],
                name_first: user[ 'name_first'],
                name_last: user[ 'name_last'],
                expiresAt: expiresAt,
                uuid: user['uuid'],
                relations: relations
              }, config.auth.secret);

              fs.mkdir('/tam/uploads/' + uuid);
              const uuidTag = uuidV1()
              pg.insert({uuid: uuidTag, title: 'UNTAGGED', user_id: user.uuid, about_id: uuid}).table('tags').returning('*').then((data) => { console.log(data)})
              res.send(200, {token: token, data: data[0]})

            })
          }).catch((error) => {
            console.log(error)
            res.send(500, {error: error})
          })
        }).catch((error) => {
          res.send(401, error);
        });
      });
    })
  }
}

module.exports = Register;