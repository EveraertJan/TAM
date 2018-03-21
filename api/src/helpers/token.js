const jwt = require("jwt-simple");
const config = require("./../config.js")


exports.checkToken = async (min, about, pg, token, res, next) => {
  if(token) {
    const t = token.split(' ')[1];
    const decoded = jwt.decode(t, config.auth.secret);
    console.log('decoded', decoded)
    decoded["admin_of"] = []
    for(let i = 0; i < decoded.relations.length; i++ ){
      await pg.select("users.name_first", "users.name_last", "users.uuid", "url").from("users").leftJoin('media', 'media.uuid', 'users.media_id').where({'users.uuid': decoded.relations[i].child}).then(async (child) => {
        const childInfo = {
          name_first: child[0].name_first,
          name_last: child[0].name_last,
          profilePicture: child[0].url,
          call: decoded.relations[i].call,
          uuid: child[0].uuid
        }
        decoded.admin_of.push(childInfo);
      })
    }

    let proceed = false;
    if(about !== null) {
      for(let i = 0; i < decoded.relations.length; i++) {
        // console.log(decoded.relations[i].child, about, min, decoded.relations[i].rights, decoded.relations[i].child === about, parseInt(min) <= parseInt(decoded.relations[i].rights))
        if(decoded.relations[i].child === about && parseInt(min) <= parseInt(decoded.relations[i].rights)) {
          console.log("proceeding")
          proceed = true
        }
      }
    } else {
      proceed = true;
    }
    if(about == decoded.uuid) {
      proceed = true
    }
    console.log(about, decoded.uuid)

    if(decoded.expiresAt < new Date().getTime()) {
      proceed =  false
    } 


    if(proceed){
      console.log('proceeding')
      delete decoded["relations"]
      next(decoded);
    } else {
      res.send(401, { message: "bad token"})
    }
  } else {
    res.send(401)
  }
}
