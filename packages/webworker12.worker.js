

// const io = importScripts('socket.js')
import io from 'socket.io-client'
const socket  = io('ws://192.168.81.126:3000/'); // dev
socket.emit('login', {userid: new Date().getTime(), username: '老师', type: 2});

addEventListener('message', function (e) {
    socket.emit('message',  e.data)
}, false);

// socket.on('message',  (data) => {
//     self.postMessage(data);
// })


