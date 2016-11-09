#!/usr/local/bin/node --harmony_destructuring
"use strict";

const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs");
const $ = require("jquery");
const expressLayouts = require('express-ejs-layouts');
const pg = require('pg');
const _ = require('underscore');
var Promise = require('promise');
var bodyParser = require('body-parser')


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

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
    console.log('At root of Brocolito.io....');
    client.query('SELECT * FROM usuarios ORDER BY maxpoints DESC limit 4;', function (err, result) {
      done();
      if (err) {
        console.error(err); response.send("Error " + err);
      }
      else {
        if(result.rows.length > 10) {
          console.log("So much rows so delete 5");
          var query = "delete from usuarios where maxpoints in (select top " + 5  + " maxpoints from usuarios order by maxpoints desc)";
          client.query(query);
        }
        response.render ('index', {title: "Brocolito", rows: result.rows, _: _});
      }
    });
  });
});

app.post('/start', (request, response) => {
  console.log("/start request successful");

  response.render ('game', {title: "Brocolito", extraLife: request.body.extraLife});
});



app.get('/gameOver', (request, response) => {
  var score = request.body.score;
  var lowestBestPoints;
  console.log("Game Over..Score was " + score);
  pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');
    var highscores;
    var query = client.query('SELECT * FROM usuarios ORDER BY maxpoints DESC limit 4;', function (err, result) {
      if (err) {
        console.error(err); response.send("Error " + err);
      }
      else {
        console.log("Number of rows: " + result.rows.length);
        lowestBestPoints = result.rows[3].maxpoints;
        console.log(lowestBestPoints + " are the minimum points");
        highscores = result;
      }
    });

    query.on ('end', function() {
      if (score > lowestBestPoints) {
        console.log("Score better: " + score);
      //  var query2 = client.query("DELETE FROM usuarios WHERE maxpoints = $1;",[lowestBestPoints]);
        done();
        response.render ('newScore', { title: "Brocolito", highscore: score, error: "none" });
/*
        query2.on ('end', function() {
          done();
          done();
          console.log("Done deleted");
        });
*/

      }
      else {
        console.log("Too low score with " + score);
        // do your thang
        done();
        response.redirect("/");
      }
    });
  });
});

app.get('/saveNewHighscore', (request, response) => {
  pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    // Check if userExists
    var checkingQuery = "select count(*) from usuarios where username='" + request.query.userName + "';";
    console.log("Check --> " + checkingQuery);
    client.query(checkingQuery, function (err, result) {
        if (err) {
          console.error(err); response.send("Error " + err);
        }
        else {
          if (result.rows[0].count > 0) {
            console.log("UserName: " + request.query.userName + " already exists..");
            done();
            response.render ('newScore', {
              title: "Brocolito",
              highscore: request.query.highscore,
              error: request.query.userName + " already exists. Put another."
            });
          }
          else {
            var query = "INSERT INTO usuarios VALUES ('" + request.query.userName + "', " + request.query.highscore + ");";
            console.log("Query is: " + query);
            client.query(query, function (err, result) {
              if (err) {
                console.error(err); response.send("Error " + err);
              }
              else {
                console.log("Redirect back to main page");
                done();
                response.redirect("/");
                //response.render ('index', {title: "Brocolito", rows: highscores.rows, _: _});
              }
            });
          }
        }
    });
  });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
