const uuidV1 = require('uuid/v1');
const config = require("./../../config.js");

const { checkToken } = require("./../../helpers/token")

class Register {

  constructor( app, pg ) {

    app.post('/register',  async (req, res, next) => {
      const uuid = uuidV1();
      const data = {
        given_name: req.body.given_name,
        family_name: req.body.family_name,
        mail: req.body.mail,
        password: req.body.password,
        uuid: uuid
      }
      await pg.select("mail").table("users").where({mail: req.body.mail}).then(async (result) => {
        if(result.length > 0) {
          res.send(400, {error: 'already exists'})
        } else {
          await pg.insert(data).table("users").then((data) => {
            res.send(200, {uuid: uuid});
          }).catch((error) => {
            res.send(401, error);
          });
        }
      })

    })


    app.post('/registerChild',  async (req, res, next) => {
      checkToken(777, null, pg, req.headers.authorization, res, async (user) => {

        const uuid = uuidV1();
        const data = {
          given_name: req.body.given_name,
          family_name: req.body.family_name,
          uuid: uuid,
          password: 'test'
        }
        await pg.insert(data).table("users").then(async (data) => {
          await pg.insert({
            parent: user.uuid,
            child: uuid,
            rights: 777,
            status: 0,
            call: req.body.call
          }).table("relations").then(() => {
            res.send(200, {uuid: uuid});
          }).catch((error) => {
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