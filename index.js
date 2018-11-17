const express = require ('express')
const bodyParser = require('body-parser')

const app = express ()
const port = process.env.PORT || 4000
const loginsRouter = require('./auth/routes')
const usersRouter = require('./users/routes')
const playlistsRouter = require('./playlists/routes')




app
    .use(bodyParser.json())
    .use(usersRouter)
    .use(loginsRouter)
    .use(playlistsRouter)
    




app.listen(port, () => console.log(`Listening on port ${port}`))

