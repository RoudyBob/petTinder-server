let express = require('express');
require('dotenv').config();
const app = express();
const sequelize = require('./db');

let petlog = require('./controllers/journalcontroller');
let user = require('./controllers/usercontroller');

sequelize.sync();
//sequelize.sync({force: true});  //If we need to force a db change

app.use('/pet', pet);
app.use('/user', user);

app.listen(3000, function(){
    console.log('The app is on port 3000');
})