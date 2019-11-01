

// const io = importScripts('socket.js')
import io from 'socket.io-client';
const socket  = io('ws://192.168.81.126:3000/'); // dev
self.onmessage = function(e) {
    socket.emit('message',  e.data)
}

// socket.on('message',  (data) => {
//     self.postMessage(data);
// })


