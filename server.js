#!/usr/local/bin/node --harmony_destructuring
"use strict";

const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs");
const expressLayouts = require('express-ejs-layouts');
const pg = require('pg');
const _ = require('underscore');
var Promise = require('promise');

const DATABASE_URL =
     "postgres://abqhujoqqkupbh:F26u-9T3marAzsj_qFVTX5vtuw@ec2-54-243-249-159.compute-1.amazonaws.com:5432/dtmcit1m6lmem";


pg.defaults.ssl = true;

app.set('port', (process.env.PORT || 8080));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');
    client.query('SELECT * FROM users ORDER BY maxpoints DESC limit 4;', function (err, result) {
      done();
      if (err) {
        console.error(err); response.send("Error " + err);
      }
      else {
        response.render ('index', {title: "Brocolito", rows: result.rows, _: _});
      }
    });
  });
});

app.get('/start', (request, response) => {
  console.log("PEPE");
  response.render ('game', {title: "Brocolito"});
});

app.get('gameOver', (request, response) => {

});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
