
// --- requires ---//

var express = require('express'),
    connect = require("connect");

var app = express();

// --- Configuration --- //

app.configure(function(){
  app.use(express.bodyParser());
  app.use(connect.compress());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname ));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// --- launch --- //

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
