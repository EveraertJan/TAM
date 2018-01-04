

class List {

  constructor( app, pg ) {

    app.get('/post/:uuid', async(req, res, next) => {
      const uuid = req.params.uuid;
      await pg.select().table('posts').where({uuid: uuid}).then(async (data) => {
        console.log(data)
        if(data.length > 0) { 
          await pg.select().from('postsPart').where({post_id: uuid}).then((dataParts) => {
            const response = data[0];
            response['parts'] = dataParts;
            console.log(response)
            res.status(200).send( response )
          })
        } else {
          res.status(200).send({});
        }

      })
    })
  }
}

module.exports = List;