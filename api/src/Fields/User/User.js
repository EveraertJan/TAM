
const Login = require('./Login');
const Register = require('./Register');
const Profile = require('./Profile');
const Detail = require('./Detail');
const Edit = require('./Edit');

class User {
  constructor( app, pg ) {
    new Login(app, pg);
    new Register(app, pg);
    new Profile(app, pg);
    new Detail(app, pg);
    new Edit(app, pg);
  }

}

module.exports = User