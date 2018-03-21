const uuidV1 = require('uuid/v1');
const { checkToken } = require("./../../helpers/token")


class Create {

  constructor( app, pg ) {

    app.post('/file/upload', async(req, res, next) => {
      checkToken(333, null, pg, req.headers.authorization, res, async (user) => {
  
        if (!req.files) {
          return res.status(400).send('No files were uploaded.');
        }
       
        let sampleFile = req.files.file;
        sampleFile.mv(`/tam/uploads/${user.uuid}/${req.files.file.name}` , async (err) => {
          if (err) {
            console.log(err)
            return res.status(500).send(err);
          }
          const file = {
            type: 'IMG',
            url: `/uploads/${user.uuid}/${req.files.file.name}`,
            uuid: uuidV1()
          }
          await pg.insert(file).table('media').returning('*').then(async (data) => {
            res.status(200).send(data[0])
          }).catch((error) => {
            console.log(error)
            res.status(400)
          })
        })
      })
    })
    
  }


}

module.exports = Create;