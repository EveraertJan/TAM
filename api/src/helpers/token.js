const jwt = require("jwt-simple");
const config = require("./../config.js")


exports.checkToken = (min, about, pg, token, res, next) => {
  if(token) {
    const t = token.split(' ')[1];

    const decoded = jwt.decode(t, config.auth.secret);
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
      next(decoded);
    } else {
      res.send(401, { message: "bad token"})
    }
  } else {
    res.send(401)
  }
}
