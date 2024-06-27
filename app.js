
const express = require('express');
const Client = require('pg');
const cors = require('cors');
require('dotenv').config();
const createdb =require('./database/createdb');
const seeder =require('./database/seeder');

const commitsql = require("./database/commitsql").default
const routes =require('./api/index')
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;


 const app = express();
 app.use(express.json());

 app.use(bodyParser.json()); 
 app.use(bodyParser.urlencoded({ extended: true })); 
 app.use(cors({ origin: "*", }))
 app.use(cors());
 //app.options('*', cors());
 /*app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})*/
routes(app)


//createdb()
//seeder()

 /*app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
  });*/
  

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

                                        
