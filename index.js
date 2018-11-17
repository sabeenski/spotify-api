const express = require ('express')
const app = express ()
const port = process.env.PORT || 4000
const Playlist = require('./playlists/model')



app.get('/playlists', function (req, res, next) {
    Playlist.findAll().then(playlists => {
      res.json({ playlists: playlists })
    })
  }) 



app.listen(port, () => console.log(`Listening on port ${port}`))

