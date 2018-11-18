const {Router} = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()


router.get('/users', (req,res,next) => {
    User
    .findAll()
    .then(users => {
        res.send({users})
    })
    .catch(error => next(error))
}) 

router.post('/users', (req,res, next) => {
    const user01 = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    User
    .create(user01)
    .then(user => {
        return res.status(201).send(user)
    })   
})


module.exports = router