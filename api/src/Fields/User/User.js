
const Login = require('./Login');
const Register = require('./Register');
const Profile = require('./Profile');


class User {
  constructor( app, pg ) {
    new Login(app, pg);
    new Register(app, pg);
    new Profile(app, pg);
  }

}

module.exports = User