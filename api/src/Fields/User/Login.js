const uuidV1 = require('uuid/v1');
const jwt = require("jwt-simple");
const config = require("./../../config.js");
const { checkToken } = require("./../../helpers/token")


class Login {

  constructor( app, pg ) {
    this.comparePass = this.comparePass.bind(this)

    app.post('/login',  async (req, res, next) => {
      pg.select().table("users").where({"usermail": req.body.usermail}).then( async (result) =>{
        if(result.length > 0) {

          if(this.comparePass(req.body.password, result[0].password)) {
            console.log('all fine')

            const expiresAt = JSON.stringify(new Date().getTime() + 3*24*60*60*1000);

            const relations = await pg.select("*").table("relations").where({parent: result[0].uuid}).then((relations) => relations)
            const profilePic = await pg.select('url').table('media').where({uuid: result[0].media_id}).then((img) => img[0].url )
            const token = jwt.encode(
              { 
                usermail: req.body.usermail,
                name_first: result[0][ 'name_first'],
                name_last: result[0][ 'name_last'],
                expiresAt: expiresAt,
                uuid: result[0].uuid,
                relations: relations,
                profilePicture: profilePic
              }, config.auth.secret);

            // TODO: add expires_at to body
            // 
            res.send(200, {token: token})



          } else {
            res.send(401, { message: "Password incorrect, try again", status: 401, field: "password"});
          }
        } else {
          res.send(401, { message: "Mail not recognized in the system", status: 401, field: "mail"});
        }
      })

    })
    app.post('/verifyToken',  async (req, res, next) => {
      checkToken(777, null, pg, req.headers.authorization, res, (data) => {
        res.status(200).send(data)
      });
    })


  } 
  comparePass(userPassword, databasePassword) {
    // const decryptedString = cryptr.decrypt(databasePassword);
    return (userPassword == databasePassword);
  }
}

module.exports = Login;