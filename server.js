/* global global */
/* global bson */
/* global = __dirname, mongoose, Schema,Promise,fs,io */
// modules =================================================
var express        = require('express'),
    io = require('socket.io'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = io.listen(server);
mongoose       = require('mongoose-q')(require('mongoose'), {q:require('q-bluebird')});
//mongoose.Promise = require('bluebird');
//var app            = express();
var bodyParser     = require('body-parser');
// Database configuration ===========================================
var db = require('./app/database/config/mongoDBSettings');
mongoose.connect(db.url);
Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// routes ==================================================
//require('./app/sockets/base')(io);
require('./app/serverRoutes')(app);

// start app ===============================================
server.listen(3009, function(){
    console.log('SCRUM-iT started on port 3009!!');    
});

io.sockets.on('connection', function (socket) {
    socket.on('message', function (from, msg) {

      console.log('recieved message from', 
                  from, 'msg', JSON.stringify(msg));

      console.log('broadcasting message');
      console.log('payload is', msg);
      io.sockets.emit('broadcast', {
        payload: msg,
        source: from
      });
      console.log('broadcast complete');
    });
  });
  
module.exports = app;