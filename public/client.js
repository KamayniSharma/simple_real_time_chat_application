const socket = io();

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')


//   prompt
do {
    name = prompt('Please enter your name:')
} while (!name);


//  textarea in bottom
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    //append
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom();

    //send to server via socket
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;

    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
     `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

//receive messages
socket.on('message', (msg) => {
    // console.log(msg)
    appendMessage(msg, 'incoming');
    scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}

