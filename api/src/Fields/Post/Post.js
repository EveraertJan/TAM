
const List = require('./List');
const Detail = require('./Detail');
const Create = require('./Create');

class User {
  constructor( app, pg ) {
    new List(app, pg);
    new Detail(app, pg);
    new Create(app, pg);
  }

}

module.exports = User