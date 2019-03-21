'use strict';

require('dotenv').config();
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');


const {router: giftsRouter} = require('./gifts');
const {router: usersRouter} = require('./users');
const {router: authRouter, localStrategy, jwtStrategy } = require('./auth');


mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require ('./config');

const app = express();
app.use(express.json());
app.use(morgan('common'));
app.use(express.static("public"));

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', {session: false});



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/views/index.html");
});

//doesnt work because after get request is authorized, the window.location.href is still unauthorized
app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/public/views/gifts.html")
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/views/login.html")
});


app.get("/friend/", (req, res) => {
  res.sendFile(__dirname + "/public/views/friends.html")
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

app.use('/api/gifts', giftsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);





app.use('*', (req, res) => {
  return res.status(404).json({message: 'Not Found'});
});

let server;

function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl,{ useNewUrlParser: true }, err => {
      if(err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing Server');
      server.close(err => {
        if(err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer};
