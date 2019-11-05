
import io from 'socket.io-client'
import MyWorker  from './webworker3.worker'
let send
if (typeof(Worker) !== 'undefined' ) {
    const worker = new MyWorker();
    // 支持webworker
    send = (value)=> {
        worker.postMessage(value) 
    }
} else {
    const socket = io('ws://192.168.81.126:3000/'); // dev
    // 告诉服务器端有用户登录
    socket.emit('login', { userid: new Date().getTime(), username: '打野' })
    send = (value)=> { socket.emit('message',value) }
}
export default send