const express = require('express');
const socket = require('socket.io');

//App setup
const app = express();
const server = app.listen(3000, function(){
    console.log('listening to requests on port 3000');
});

//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);
io.on('connection', connectionIO);

function connectionIO (socket){
    console.log('socket connection made' + socket.id);

    //Listener
    socket.on('chat', sendMessage);
    socket.on('typing', sendUserTyping);

    function sendMessage (data){
        //can save message to db or json file
        io.sockets.emit('chat',data);
    }

    function sendUserTyping (data){
        socket.broadcast.emit('typing',data);
    }

}