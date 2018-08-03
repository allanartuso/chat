module.exports = {
    say: saySomething,
    calc: calcSomething
}

function saySomething (myText){
    console.log(myText);
}

function calcSomething (){
    sum = 5 + 9;
    console.log(`My calcule is ${sum}`);
}