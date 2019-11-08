

// const io = importScripts('socket.js')
import io from 'socket.io-client'
const socket  = io('ws://192.168.81.126:3000/'); // dev
// socket.emit('login', {userid: new Date().getTime(), username: '老师', type: 2});
// 发数据
addEventListener('message', function (e) {
    const mainData = e.data
    switch (mainData.event) {
        case 'login':
            socket.emit('login', mainData.data)
            break;
       case 'message':
            socket.emit('message', mainData.data)
            break;
        case 'toOne':
            socket.emit('toOne', mainData.data)
            break;
        case 'writeIn':
            socket.emit('writeIn', mainData.data)
            break;
        default:
            break;
    }
}, false);




// 收数据
socket.on('message',  (data) => {
    postMessage({data, event: 'message'})
})

socket.on('toOne',  (data) => {
    postMessage({data, event: 'toOne'})
})


