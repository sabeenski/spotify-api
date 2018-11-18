const Sequelize = require('sequelize')
const sequelize = require('../db')


const Song = sequelize.define('songs', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false
  },
  album: {
      type: Sequelize.STRING,
      allowNull: false

  },
  playlistId: {
    type: Sequelize.INTEGER,
    field: 'playlist_id',
  }
}, {
  timestamps: false,
  tableName: 'songs'
})


module.exports = Song