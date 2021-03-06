const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuidV1 = require('uuid/v1');
const faker = require("faker");
const passport = require('passport')
const session = require('express-session')
const fileUpload = require('express-fileupload');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');


const app = express();
const server = http.Server(app);
const PORT = 3000;

const UserApp = require('./Fields/User/User.js');
const PostApp = require('./Fields/Post/Post.js');
const FileApp = require('./Fields/File/File.js');
const TagsApp = require('./Fields/Tags/Tags.js');

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
    app.use(fileUpload());

    app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false  }));

    app.use(cors({credentials: false, origin: '*'}))

    app.use('/uploads', express.static('/tam/uploads'))

    app.get('/', async (req, res, next) => {
      res.send(200, {message: 'why the fuck...'})
    })

    new UserApp( app, this.pg, passport);
    new PostApp( app, this.pg );
    new FileApp( app, this.pg );

    server.listen(3000, () => {
      console.log(`server up and listening on ${PORT}`)
    })

  }

  async initialiseTables() {

    await this.pg.schema.createTableIfNotExists('users', function (table) {
      table.increments();
      table.uuid("uuid");
      table.string('password').notNullable();
      table.string('name_first').notNullable();
      table.string('name_last').notNullable();
      table.string("usermail");
      table.string("date_of_birth");
      table.uuid("media_id");
      table.timestamps(true, true);
    }).then(function() {
      console.log("created users")
    });


    await this.pg.schema.createTableIfNotExists('relations', function (table) {
      table.increments();
      table.uuid("uuid");
      table.string("call");
      table.uuid("parent");
      table.uuid("child");
      table.integer("status");
      table.integer("rights")
      table.timestamps(true, true);
    }).then(function() {
      console.log("created relations")
    });


    await this.pg.schema.createTableIfNotExists('userInfo', function (table) {
      table.increments();
      table.uuid("uuid");
      table.string("user_id");
      table.integer("weight");
      table.string("weight_unit");
      table.integer("length");
      table.string("length_unit");
      table.string("place");
      table.string("time");
      table.timestamps(true, true);
    }).then(function() {
      console.log("created userInfo")
    });




    await this.pg.schema.createTableIfNotExists('posts', function (table) {
      table.increments();
      table.uuid("uuid");
      table.string('title').notNullable();
      table.text('excerpt').notNullable();
      table.string("user_id");
      table.string("media_id");
      table.string('about_id');
      table.timestamps(true, true);
    }).then(function() {
      console.log("created posts")
    });


    await this.pg.schema.createTableIfNotExists('tags', function (table) {
      table.increments();
      table.uuid("uuid");
      table.string('title').notNullable();
      table.string('user_id');
      table.string('about_id');
      table.timestamps(true, true);
    }).then(function() {
      console.log("created tags")
    });


    await this.pg.schema.createTableIfNotExists('tagsPivot', function (table) {
      table.increments();
      table.uuid("uuid");
      table.uuid('tag_id');
      table.uuid('post_id');
      table.timestamps(true, true);
    }).then(function() {
      console.log("created tagsPivot")
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
