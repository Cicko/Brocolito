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


const scoresTemplate = `
<div class="container">
  <h2>Best Scores</h2>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Points</th>
        <th>UserName</th>
      </tr>
    </thead>
    <tbody>
    <% _.each(rows, (row) => { %>
      <tr>
        <td>row.maxpoints</td>
        <td>row.username</td>
      </tr>
    <% }); %>
    </tbody>
  </table>
</div>
`;
const DATABASE_URL =
     "postgres://abqhujoqqkupbh:F26u-9T3marAzsj_qFVTX5vtuw@ec2-54-243-249-159.compute-1.amazonaws.com:5432/dtmcit1m6lmem";

var query;
var table;

var scores = [];

function setQuery (qry) {
  console.log("Query is: ");
  console.log(qry);
  qry = $.parseJSON(qry);
  console.log("Query after parse is: " + qry);
  query = qry
}

pg.defaults.ssl = true;

// Connect to the database
pg.connect(DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');


   var p1 = new Promise (function () {
     client
     .query('SELECT * FROM users ORDER BY maxpoints DESC;')
     .on('row', function(row) {
      scores.push(row);
      console.log(JSON.stringify(row));
     });
   });

   p1.then(function (cucu) {
     console.log("LETS template it");
     table = _.template(scoresTemplate, { rows: query });
   }).catch(function (cucu) {
    console.log("ERROR HAPPEN");
   });
});


app.set('port', (process.env.PORT || 8080));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {

  console.log(table);

  response.render ('index', {title: "Brocolito", table: table});
});

app.get('/start', (request, response) => {
  console.log("PEPE");
  response.render ('game', {title: "Brocolito"});
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
