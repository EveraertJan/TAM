const Create = require('./Create');

class File {
  constructor( app, pg ) {
    new Create(app, pg);
  }

}

module.exports = File