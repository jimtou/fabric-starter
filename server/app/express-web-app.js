

const RELPATH = '/../'; // relative path to server root. Change it during file movement

var express = require('express');
var expressEnv = require('../lib/express-env-middleware');
var expressPromise = require('../lib/express-promise');


module.exports = function(rootFolder, clientEnv){
  "use strict";

  clientEnv = clientEnv || {};

  var app = express();
  app.use(expressPromise());

  // console.log('The following config will be exposed to client as env.js: ', clientEnv);
  app.get('/env.js', expressEnv(clientEnv));
  app.use( express.static(__dirname + RELPATH + rootFolder, { index: 'index.html'}) );

  // at last - send 404
  app.use(function(req, res, next) { // jshint ignore:line
    res.status(404).end('Not Found');
  });

  return app;
};