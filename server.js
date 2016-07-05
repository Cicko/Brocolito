#!/usr/local/bin/node --harmony_destructuring
"use strict";

const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs");
const expressLayouts = require('express-ejs-layouts');



//const databaseFile = "db/database.db";
//const sqlite3 = require("sqlite3").verbose();
//const db = new sqlite3.Database(databaseFile);
//var exists = fs.existsSync(databaseFile);

app.set('port', (process.env.PORT || 5000));

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
