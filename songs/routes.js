const {Router} = require('express')
const Song = require('./model')
const Playlist = require('../playlists/model')


const router = new Router()

router.post('/playlists/:id/songs', (req,res,next) => {
    Playlist
        .findById(req.params.id)
        .then(playlist => {
            if(!playlist){
                return res.status(404).send({
                    message: `No playlist found!`
                })
            }
            Song
              .create({
                  title: req.body.title,
                  artist: req.body.artist,
                  album: req.body.album,
                  playlistId: playlist.id
              }) 
              .then(song => {
                  res.status(201).send(song)
              }) 
        })
    .catch(error => next(error))              

})

// BONUS

router.get('/artists',(req,res,next) => {
    
    Song
    .findAll()
    .then(songs => {
        const artists = songs.map(song => {
          return `artist: ${song.artist}, title: ${song.title}`
            
        })
        return res.send(artists)
    }
    )


    .catch(error => next(error))
       
        
})
// DELETE /playlists/:id/songs/:id: A user should be able to delete songs from their playlist.

router.delete('/playlists/:id/songs/:id', (req,res,next) => {
    Playlist
        .findById(req.params.id)
        .then(Song.findById(req.params.id)
                    .then(song => song.destroy()
                        .then(res.send({
                            message: `Your song is deleted.`
                        }))
                    )           
            )
        

    .catch(error => next(error))
       
        
})

module.exports = router