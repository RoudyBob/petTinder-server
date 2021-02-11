const Sequelize = require('sequelize');

const sequelize = new Sequelize('pettinder', 'postgres', 'password', {
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