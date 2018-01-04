const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuidV1 = require('uuid/v1');
const faker = require("faker");


const app = express();
const server = http.Server(app);
const PORT = 3000;

const UserApp = require('./Fields/User/User.js')
const PostApp = require('./Fields/Post/Post.js')

class App {

  constructor(opts) {

    this.pg = require('knex')({
      client: 'pg',
      connection: process.env.PG_CONNECTION_STRING,
      searchPath: 'knex,public'
    });

    const _this = this;

    this.pg.raw('select 1+1 as result').then(function () {
      _this.initialiseTables();
    });


    this.start = this.start.bind(this);

    this.app = express();
    this.s = http.Server(this.app);
  }

  async start() {

    app.use( bodyParser.json() );       // to support JSON-encoded bodies

    app.use(cors({credentials: false, origin: '*'}))



    app.get('/', async (req, res, next) => {
      const result = {};

      res.send(result)
    })

    new UserApp( app, this.pg );
    new PostApp( app, this.pg );


    server.listen(PORT, () => {
      console.log(`server up and listening on ${PORT}`)
    })

  }

  async initialiseTables() {

    await this.pg.schema.createTableIfNotExists('users', function (table) {
      table.increments();
      table.uuid("uuid");
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string("usermail");
      table.timestamps(true, true);
    }).then(function() {
      console.log("created users")
    });



    await this.pg.schema.createTableIfNotExists('tokens', function (table) {
      table.increments();
      table.timestamps(true, true);
      table.uuid("user");
      table.string("token");
      table.dateTime("expires_on");
    }).then(function() {
      console.log("created tokens")
    });


    await this.pg.schema.createTableIfNotExists('posts', function (table) {
      table.increments();
      table.uuid("uuid");
      table.string('title').notNullable();
      table.string('excerpt').notNullable();
      table.string("user_id");
      table.string("media_id");
      table.string('about_id');
      table.timestamps(true, true);
    }).then(function() {
      console.log("created posts")
    });


    await this.pg.schema.createTableIfNotExists('postsPart', function (table) {
      table.increments();
      table.uuid("uuid");
      table.text('content', 'longtext')
      table.integer("order");
      table.string('post_id');
      table.timestamps(true, true);
    }).then(function() {
      console.log("created postPart")
    });



    await this.pg.schema.createTableIfNotExists('media', function (table) {
      table.increments();
      table.uuid("uuid");
      table.string('url').notNullable();
      table.string('type').notNullable();
      table.timestamps(true, true);
    }).then(function() {
      console.log("created media")
    });
  }
}
module.exports = App;
