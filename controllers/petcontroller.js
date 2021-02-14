let express = require('express');
const Sequelize = require('../db');
const Pet = require('../db').import('../models/pet');
const router = express.Router();
const validateSession = require ('../middleware/validate-session');

router.post('/', validateSession, function (req, res) {
    const petEntry = {
        dogname: req.body.dogname,
        breed: req.body.breed,
        gender: req.body.gender,
        citylocation: req.body.citylocation,
        statelocation: req.body.statelocation,
        description: req.body.description,
        photourl: req.body.photourl,
        ownerid: req.user.id
    }

    Pet.create(petEntry)
    .then(pet => res.status(200).json(pet))
    .catch(err => res.status(500).json({ error: err }));
});

// This one gets by ID if the owner owns the pet
// router.get('/:id', validateSession, function (req, res) {
//     Pet.findOne({
//         where: { ownerid: req.user.id, id: req.params.id }
//     })
//     .then(pet => res.status(200).json(pet))
//     .catch(err => res.status(500).json({ error: err }));
// });

// This one gets by ID regardless of owner
router.get('/:id', validateSession, function (req, res) {
    Pet.findOne({
        where: { id: req.params.id }
    })
    .then(pet => res.status(200).json(pet))
    .catch(err => res.status(500).json({ error: err }));
});

// This one gets by gender if the owner owns the pet
// router.get('/gender/:gender', validateSession, function (req, res) {
//     Pet.findAll({
//         where: { ownerid: req.user.id, gender: req.params.gender }
//     })
//     .then(pet => res.status(200).json(pet))
//     .catch(err => res.status(500).json({ error: err }));
// });

// This one gets by gender regardless of owner
router.get('/gender/:gender', validateSession, function (req, res) {
    Pet.findAll({
        where: { gender: req.params.gender }
    })
    .then(pet => res.status(200).json(pet))
    .catch(err => res.status(500).json({ error: err }));
});

// This one gets by city regardless of owner
router.get('/city/:city', validateSession, function (req, res) {
    Pet.findAll({
        where: 
            Sequelize.where(
                Sequelize.fn('lower', Sequelize.col('citylocation')), req.params.city.toLowerCase())
    })
    .then(pet => res.status(200).json(pet))
    .catch(err => res.status(500).json({ error: err }));
});

// This one gets by state regardless of owner
router.get('/state/:state', validateSession, function (req, res) {
    Pet.findAll({
        where: 
            Sequelize.where(
              Sequelize.fn('lower', Sequelize.col('statelocation')), req.params.state.toLowerCase())
        })
    .then(pet => res.status(200).json(pet))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;