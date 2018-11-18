const express = require ('express')
const bodyParser = require('body-parser')

const app = express ()
const port = process.env.PORT || 4000
const loginsRouter = require('./auth/routes')
const usersRouter = require('./users/routes')
const playlistsRouter = require('./playlists/routes')
const songsRouter = require('./songs/routes')



app
    .use(bodyParser.json())
    .use(usersRouter)
    .use(loginsRouter)
    .use(playlistsRouter)
    .use(songsRouter)
    




app.listen(port, () => console.log(`Listening on port ${port}`))

