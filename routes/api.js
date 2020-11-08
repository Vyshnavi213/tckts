const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')

const User = require('../models/user')
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/eventsdb", { useNewUrlParser: true }, err => {
    if (err) {
        console.error('Error' + err)
    } else {
        console.log("Connected to mongodb")
    }
})
mongoose.set('useFindAndModify', false);

router.get('/', (req, res) => {
    res.send('From API route')
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1] //This splits the token into array which consists of two parts one is Bearer and the other is the actual token
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

//API for registration
router.post('/register', (req, res) => { //req, res are for call back function
    let userData = req.body
    let user = new User(userData)
     user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
            console.log(registeredUser)
            //res.status(200).send(registeredUser)
        }
    })
})

// router.get('/getregister', (req,res) => {
//     let userData = req.body
//     let user = new User(userData)
//     console.log(userData)
// }) 

//API for login
router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send("Invalid email")
            } else if (user.password !== userData.password) {
                res.status(401).send("Invalid password")
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({ token })
            }
        }
    })
})

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Angular",
            "description": "angular.io",
            "books": 5
        },
        {
            "_id": "2",
            "name": "MongoDB",
            "description": "beginnersbook.com/mongodb-tutorial",
            "books": 4
        },
        {
            "_id": "3",
            "name": "Node JS",
            "description": "Node js W3 schools",
            "books": 6
        },
        {
            "_id": "4",
            "name": "Express JS",
            "description": "expressjs.com",
            "books": 6
        },
        {
            "_id": 5,
            "name": "Mongoose",
            "description": "mongoosejs.com",
            "books": 5
        },
        {
            "_id": "6",
            "name": "Python",
            "description": "python.org",
            "books": 2
        }
    ]
    res.json(events)
})


router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Angular",
            "description": "angular.io",
            "books": 5
        },
        {
            "_id": "2",
            "name": "MongoDB",
            "description": "beginnersbook.com/mongodb-tutorial",
            "books": 4
        },
        {
            "_id": "3",
            "name": "Node JS",
            "description": "Node js W3 schools",
            "books": 6
        },
        {
            "_id": "4",
            "name": "Express JS",
            "description": "expressjs.com",
            "books": 6
        },
        {
            "_id": 5,
            "name": "Mongoose",
            "description": "mongoosejs.com",
            "books": 5
        },
        {
            "_id": "6",
            "name": "Python",
            "description": "python.org",
            "books": 2
        }
    ]
    // let events = [
    //     {
    //         "_id": "1",
    //         "name": "Auto Expo",
    //         "description": "lorem ipsum",
    //         "date": "2012-04-23T18:25:43.511Z"
    //     },
    //     {
    //         "_id": "2",
    //         "name": "Auto Expo",
    //         "description": "lorem ipsum",
    //         "date": "2012-04-23T18:25:43.511Z"
    //     },
    //     {
    //         "_id": "3",
    //         "name": "Auto Expo",
    //         "description": "lorem ipsum",
    //         "date": "2012-04-23T18:25:43.511Z"
    //     },
    //     {
    //         "_id": "4",
    //         "name": "Auto Expo",
    //         "description": "lorem ipsum",
    //         "date": "2012-04-23T18:25:43.511Z"
    //     },
    //     {
    //         "_id": 5,
    //         "name": "Auto Expo",
    //         "description": "lorem ipsum",
    //         "date": "2012-04-23T18:25:43.511Z"
    //     },
    //     {
    //         "_id": "6",
    //         "name": "Auto Expo",
    //         "description": "lorem ipsum",
    //         "date": "2012-04-23T18:25:43.511Z"
    //     }
    // ]
    res.json(events)
})


module.exports = router;
//All database requests are going to be managed in the api route, database connection happens in api.js