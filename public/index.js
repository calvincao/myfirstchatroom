// import io from './node_modules/socket.io-client';

const socket = io.connect();
const button = document.getElementById('button');
button.addEventListener('click', () => {
  socket.emit('clicked');
});

socket.on('clicked2', () => {
  if (!document.body.style.backgroundColor) document.body.style.backgroundColor = 'red';
  else document.body.style.backgroundColor = null;
});

const send = document.getElementById('send');
send.addEventListener('click', () => {
  const textField = document.getElementById('message');
  const message = textField.value;
  socket.emit('sendMessage', message);
  textField.value = null;
});

socket.on('sendMessageBack', (message) => {
  const h1 = document.createElement('h1');
  h1.innerText = message;
  const body = document.querySelector('body');
  body.appendChild(h1);
});
