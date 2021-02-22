const express = require('express');
require('dotenv').config();
const app = express();
const sequelize = require('./db');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// middleware for file upload
app.use(express.static('public')); // to access the files in public folder
app.use(cors()); // this enables CORS requests
app.use(fileUpload());

//import JSON support for Express
app.use(express.json());

let pet = require('./controllers/petcontroller');
let user = require('./controllers/usercontroller');

sequelize.sync();
//sequelize.sync({force: true});  //If we need to force a db change

// header configuration for client requests
app.use(require('./middleware/headers'));

app.use('/pet', pet);
app.use('/user', user);

// file upload api
app.post('/upload', (req, res) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
    const myFile = req.files.file;
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
})

app.listen(3000, function(){
    console.log('The app is on port 3000');
})