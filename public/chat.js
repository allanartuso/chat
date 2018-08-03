//Connection
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

socket.on('typing', getUserTyping);
socket.on('chat', waitMessage);

//Functions

//async to receive data
async function waitMessage(data){

    var waiting = await wait();
    console.log(waiting);
    getMessage(data);
    
};

//receiving data
function getMessage(data){
    output.innerHTML+= '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
    feedback.innerHTML = '';
};

function wait(){
    feedback.innerHTML = '<p><em>Message sent, wait a second</em></p>';
    return new Promise(resolve => {
        setTimeout( () => {
            resolve(true);
        }, 2000);
    });
};

function getUserTyping(data){

    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    return true;

};

//sending data
function sendButton(){

    messageData = {
        message: message.value,
        handle: handle.value
    };

    socket.emit('chat',messageData);
};

function typing(){

    socket.emit('typing',handle.value);

};