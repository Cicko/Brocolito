#!/usr/local/bin/node --harmony_destructuring
"use strict";

const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs");
const expressLayouts = require('express-ejs-layouts');

var pg = require('pg');

// process.env.DATABASE_URL
pg.defaults.ssl = true;
pg.connect("postgres://abqhujoqqkupbh:F26u-9T3marAzsj_qFVTX5vtuw@ec2-54-243-249-159.compute-1.amazonaws.com:5432/dtmcit1m6lmem", function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT * FROM users;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});
//const databaseFile = "db/database.db";
//const sqlite3 = require("sqlite3").verbose();
//const db = new sqlite3.Database(databaseFile);
//var exists = fs.existsSync(databaseFile);

app.set('port', (process.env.PORT || 8080));

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  //response.render ('index', { title: "Brocolito"} );
  response.sendFile( '/index.html' , { root:__dirname });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
