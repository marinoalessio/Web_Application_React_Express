'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const { check, validationResult } = require('express-validator'); // validation middleware
const dao = require('./dao'); // module for accessing the DB
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const userDao = require('./user-dao'); // module for accessing the users in the DB
const cors = require('cors');




/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy( // vuol dire la strategia di user e pass
  function (username, password, done) {
    userDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });

      return done(null, user);
    })
  }
));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);   // decidiamo di mettere dentro il nostro cookie l'id... perché tanto nella deserializeUser andiamo a recuperare le altre info
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});




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
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'not authenticated' });
}

app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false
}));

// then, init passport
app.use(passport.initialize());
app.use(passport.session());


/* --- APIs --- */


// POST /sessions 
// login
app.post('/api/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user); // <--- mi da indietro quello che mando
    });
  })(req, res, next);
});




/* tutte le api */

// GET /api/courses
app.get('/api/courses', (req, res) => {
  dao.listCourses()
    .then(courses => res.json(courses))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: `Database error while retrieving courses` }).end()
    });
});


app.get('/api/courses/incompatibilities/:code', (req, res) => {
  dao.getCourseIncompatibilities(req.params.code)
    .then(courses => res.json(courses))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: `Database error while retrieving courses` }).end()
    });
});

app.get('/api/courses/propaedeutics/:code', (req, res) => {
  dao.getCoursePropaedeutics(req.params.code)
    .then(courses => res.json(courses))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: `Database error while retrieving courses` }).end()
    });
});


app.get('/api/courses/maxstudents/:code', (req, res) => {
  dao.getCourseMaxStudents(req.params.code)
    .then(number => res.json(number))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: `Database error while retrieving max students` }).end()
    });
});











// COMMENTI SULL'AUTENTICAZIONE
// Se non ho il cookie della sessione che corrisponde ad un utente che sta nel db non ho accesso, viene restituito un 401
// per rendere autenticate le funzioni
// GET /api/courses (auth)


app.listen(port, () => {
  console.log(`react-score-server listening at http://localhost:${port}`);
});

