const uuidV1 = require('uuid/v1');
const { checkToken } = require("./../../helpers/token")


class Create {

  constructor( app, pg ) {

    app.post('/post', async(req, res, next) => {

      checkToken(666, req.body.about_id, pg, req.headers.authorization, res, async (user) => {
        console.log(req.body)
        const insert = req.body;
        insert['uuid'] = uuidV1();
        insert["user_id"] = user.uuid;

        const tagList = req.body['tags'].toUpperCase().replace(' ', '').split(',');
        console.log(tagList)
        if(tagList.length === 0) {
          tagList.push('UNTAGGED');
        }
        for (var i = tagList.length - 1; i >= 0; i--) {
          const t = {
            uuid: uuidV1(),
            title: tagList[i],
            user_id: user.id,
            
          }
          await pg.select('*').table('tags').where({title: tagList[i], user_id: user.uuid, about_id: req.body['about_id']}).then(async(tag) => {
            if(tag.length > 0) {
              console.log(tag)
              await pg.insert({tag_id: tag[0].uuid, post_id: insert['uuid'], uuid: uuidV1().toString()}).table('tagsPivot').then((data) => { console.log('inserted')})
            } else {
              await pg.insert({title: tagList[i], user_id: user.uuid, about_id: req.body['about_id'], uuid: uuidV1().toString()}).table('tags').returning('*').then(async (tag) => { 
                await pg.insert({tag_id: tag[0].uuid, post_id: insert['uuid'], uuid: uuidV1().toString()}).table('tagsPivot').then((data) => { console.log('inserted')})
              })
            }
          })
        }

        delete insert['tags'];
        await pg.insert(insert).into('posts').returning('*').then(function(results) {
          res.status(200).send(results[0]);
        });
      });
    })

    app.post('/post/file', async(req, res, next) => {
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
            if(req.query.postID !== 'null' ) {
              await pg.where('uuid', req.query.postID).update({media_id: file.uuid}).table('posts').then((post) => {
                res.status(200).send(data[0])
              })
            } else {
              res.status(200).send(data[0])
            }
          }).catch((error) => {
            console.log(error)
            res.status(400)
          })
        })
      })
    })
    
    app.post('/post/:uuid', async(req, res, next) => {
      await pg.select("about_id").table("posts").where({uuid: req.params.uuid}).then((post) => {
        if(post.length > 0) {
          checkToken(666, post[0].about_id, pg, req.headers.authorization, res, async (data) => {
            const insert = req.body;
            insert['uuid'] = uuidV1();
            insert['post_id'] = req.params.uuid;
            await pg.insert(insert).into('postsPart').then(async(results) => {
              await pg.select('*').table('postsPart').where({post_id: req.params.uuid}).then((data) => {
                res.status(200).send(data);
              })
            });
          });
        }
      })
    })
  }


}

module.exports = Create;