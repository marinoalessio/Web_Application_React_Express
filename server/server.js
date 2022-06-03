'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const dao = require('./dao'); // module for accessing the DB
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
// const userDao = require('./user-dao'); // module for accessing the users in the DB
const cors = require('cors');

// init express
const app = express();
const port = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions)); // NB: Usare solo per sviluppo e per l'esame! Altrimenti indicare dominio e porta corretti


// custom middleware: check if a given request is coming from an authenticated user
// const isLoggedIn = (req, res, next) => {
//   if(req.isAuthenticated())
//     return next();
  
//   return res.status(401).json({ error: 'not authenticated'});
// }

// GET /api/courses
app.get('/api/courses', (req, res) => {
  dao.listCourses()
    .then(courses => res.json(courses))
    .catch((err) => {
      console.log(err);
      res.status(500).json({error: `Database error while retrieving courses`}).end()
    });
});

app.listen(port, () => {
  console.log(`react-score-server listening at http://localhost:${port}`);
});

