const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require ('../middleware/validate-session');

router.post('/signup', function (req, res) {
    User.create({
        username: req.body.username,
        // Validate username is an email
        password: bcrypt.hashSync(req.body.password, 13),
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })
    .then(
        function createSuccess(user) {
           let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.json({
                user: user,
                message: "User successfully registered!",
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({ error: err }));
});

router.post('/login', function (req, res) {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(
        function loginSuccess(user) {
            if(user) {
                bcrypt.compare(req.body.password, user.password, function (err, matches) {
                    if (matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                        res.status(200).json({
                            user: user,
                            message: "User login successful!",
                            sessionToken: token
                        })

                    } else {
                        res.status(502).send({ error: 'Login Failed' });
                    };
                }); 
            } else {
                res.status(500).json({ error: 'User does not exist.' })
            };
        })
    .catch(err => res.status(500).json({error: err}));
})

// Get all users
router.get('/owners', function (req, res) {
    User.findAll()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: err }));
})

router.get('/byid/:id', function (req, res) {
    User.findOne({
        where: {id: req.params.id }
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err}));
})

// Get all users
router.get('/current', validateSession, function (req, res) {
    console.log(req.user.id);
    User.findOne({
        where: { id: req.user.id }
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err }));
})

module.exports = router;