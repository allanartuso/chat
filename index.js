var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(3000, function(){
    console.log('listening to requests on port 3000');
});

//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('socket connection made' + socket.id);

    //Listener
    socket.on('chat', function(data){
        //can save message to db or json file
        io.sockets.emit('chat',data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing',data);
    });

});