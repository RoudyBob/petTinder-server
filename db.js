const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('pettinder', 'postgres', process.env.DB_SECRET, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to pettinder postgres database.');
    },
    function(err) {
        console.log(err);
    }
);

module.exports = sequelize;