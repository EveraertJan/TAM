

class List {

  constructor( app, pg ) {

    app.get('/post', async(req, res, next) => {
      await pg.select().table('posts').then((data) => {
        res.status(200).send( data )
      })
    })
  }
}

module.exports = List;