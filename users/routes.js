const {Router} = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')
const router = new Router()

router.post('/users', (req,res, next) => {
    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        password_confirmation: bcrypt.hashSync(req.body.password_confirmation, 10)
    }
    
    if(req.body.password !== req.body.password_confirmation){
        return res.status(404).send({
            message: `Passwords do not match!`
        })
    } else {
    User
    .create(user)
    .then(user => {
        if(!user){
            return res.status(404).send({
                message:`No users!`
            })
        }
        return res.status(201).send(user)
    })
    .catch(error => next(error))
    }
    
    
})


module.exports = router