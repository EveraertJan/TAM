const jwt = require("jwt-simple");
const config = require("./../config.js")


exports.checkToken = async (min, about, pg, token, res, next) => {
  if(token) {
    const t = token.split(' ')[1];

    const decoded = jwt.decode(t, config.auth.secret);
    decoded["admin_of"] = []
    for(let i = 0; i < decoded.relations.length; i++ ){
      await pg.select("given_name", "family_name").from("users").where({uuid: decoded.relations[i].child}).then((child) => {
        const childInfo = {
          given_name: child[0].given_name,
          family_name: child[0].family_name,
          call: decoded.relations[i].call
        }
        decoded.admin_of.push(childInfo);
      })
    }
    console.log(decoded)
    let proceed = false;
    if(about !== null) {
      for(let i = 0; i < decoded.relations.length; i++) {
        console.log(decoded.relations[i].child, about, min, decoded.relations[i].rights, decoded.relations[i].child === about, parseInt(min) <= parseInt(decoded.relations[i].rights))
        if(decoded.relations[i].child === about && parseInt(min) <= parseInt(decoded.relations[i].rights)) {
          console.log("proceeding")
          proceed = true
        }
      }
    } else {
      proceed = true;
    }

    if(decoded.expiresAt < new Date().getTime()) {
      proceed =  false
    } 


    if(proceed){
      delete decoded["relations"]
      next(decoded);
    } else {
      res.send(401, { message: "bad token"})
    }
  } else {
    res.send(401)
  }
}
