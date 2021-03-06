const express = require('express');
require('dotenv').config();
const app = express();
const sequelize = require('./db');
const cors = require('cors');

const multer = require ('multer');
const uploadImage = require('./helpers/fileUploader');

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
});

//middleware for file upload
app.disable('x-powered-by');
app.use(cors()); // this enables CORS requests
app.use(multerMid.single('file'))


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
app.post('/upload', async (req, res, next) => {
    try {
      const myFile = req.file
      const imageUrl = await uploadImage(myFile)
  
      res
        .status(200)
        .json({
          message: "Upload was successful",
          data: imageUrl
        })
    } catch (error) {
      next(error)
    }
})
  
app.use((err, req, res, next) => {
    res.status(500).json({
        error: err,
        message: 'Internal server error!',
    })
    next()
})

app.listen(process.env.PORT, function(){
    console.log(`App is listening on port ${process.env.PORT}`);
})