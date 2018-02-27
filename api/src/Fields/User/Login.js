const uuidV1 = require('uuid/v1');
const jwt = require("jwt-simple");
const config = require("./../../config.js");

class Login {

  constructor( app, pg ) {
    this.comparePass = this.comparePass.bind(this)

    app.post('/login',  async (req, res, next) => {
      pg.select().table("users").where({"mail": req.body.mail}).then( async (result) =>{
        if(result.length > 0) {

          if(this.comparePass(req.body.password, result[0].password)) {

            const expiresAt = JSON.stringify(new Date().getTime() + 3*24*60*60*1000);

            const relations = await pg.select("*").table("relations").where({parent: result[0].uuid}).then((relations) => {
              
              

              const token = jwt.encode(
                { 
                  mail: req.body.mail,
                  givenName: result[0][ 'given_name'],
                  familyName: result[0][ 'family_name'],
                  expiresAt: expiresAt,
                  uuid: result[0].uuid,
                  relations: relations
                }, config.auth.secret);

              // TODO: add expires_at to body
              // 
              res.send(200, {token: token})

            })



          } else {
            res.send(401, { message: "Password incorrect, try again", status: 401, field: "password"});
          }
        } else {
          res.send(401, { message: "Mail not recognized in the system", status: 401, field: "mail"});
        }
      })

    })

  } 
  comparePass(userPassword, databasePassword) {
    // const decryptedString = cryptr.decrypt(databasePassword);
    return (userPassword == databasePassword);
  }
}

module.exports = Login;