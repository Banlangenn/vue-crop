

// const io = importScripts('socket.js')
import io from 'socket.io-client'
const socket  = io('ws://192.168.81.126:3000/'); // dev
// self.onmessage = function(e) {
//     console.log('子线程收到数据')
//     console.log(e.data)
//     socket.emit('message',  e.data)
// }
// console.log(self)

addEventListener('message', function (e) {
    socket.emit('message',  e.data)
}, false);

// socket.on('message',  (data) => {
//     self.postMessage(data);
// })


