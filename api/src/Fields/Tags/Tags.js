
const List = require('./List');
const Create = require('./Create');
const Delete = require('./Delete');
class Tags {
  constructor( app, pg ) {
    new List(app, pg);
    new Create(app, pg);
    new Delete(app, pg);
  }

}

module.exports = Tags