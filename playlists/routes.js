const {Router} = require('express')
const Playlist = require('./model')
const Song = require('../songs/model')


const router = new Router()

router.post('/playlists', (req,res, next) => {
    Playlist
        .create(req.body)
        .then(playlist => {
            if(!playlist){
                return res.status(404).send ({
                    message: `Playlist was not created`
                })
            }
            return res.status(201).send(playlist)
        })
        .catch(error => next(error))
})


router.get('/playlists', (req, res, next) => {    
    Playlist
    .findAll()
    .then(playlists => {
        res.send({ playlists })
    })
    .catch(error => next(error))
})  


router.get('/playlists/:id', (req, res, next) => {
    Playlist
        .findById(req.params.id)
        .then(playlist => {
        if (!playlist) {
            return res.status(404).send({
            message: `Playlist does not exist`
            })
        }
            Song
            .findAll({
                where: {
                    playlistId: playlist.id
                }

            })
            .then(songs => {
                if(!songs){
                    return res.send(playlist)
                } 
                return res.send({
                    "Playlist name": playlist.name,
                    "Your songs": songs,
                })

            })
        })
    .catch(error => next(error))
})



router.delete('/playlists/:id', (req,res,next) =>{
     Playlist
        .findById(req.params.id)
        .then(playlist => {
            if(!playlist){
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            }
    
        Song
        .destroy({
            where: {
                playlistId: playlist.id
            }
        })
        .then(() => {
            playlist
            .destroy().then(() => {
                return res.status(200).send({
                    message: `Your playlist is deleted.`
                })
            })
        })
   
        })
    .catch(error => next(error)) 
})
    

module.exports = router