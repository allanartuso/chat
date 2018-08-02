//Make connection
var socket = io.connect('http://localhost:3000');

//Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//Emit events
btn.addEventListener('click', sendButton);
message.addEventListener('keypress',typing);

//Listen for events
socket.on('chat', getMessage);
socket.on('typing', getUserTyping);

//functions

//receiving data
function getMessage(data){
    output.innerHTML+= '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
    feedback.innerHTML = '';
}

function getUserTyping(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
}

//sending data
function sendButton(){

    messageData = {
        message: message.value,
        handle: handle.value
    };

    socket.emit('chat',messageData);
}

function typing(){
    socket.emit('typing',handle.value);
}