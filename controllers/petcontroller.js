let express = require('express');
const Pet = require('../db').import('../models/pet');
let router = express.Router();
module.exports = router;
const validateSession = require ('../middleware/validate-session');

router.get('/', validateSession, (req, res) => {
    Pet.findAll()
    .then(pet => res.status(200).json(pet))
    .catch(err => res.status(500).json({ error: err });
});
