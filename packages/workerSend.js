
import io from 'socket.io-client'
import MyWorker  from './webworker117.worker'
let _write
let _receive
if (typeof(Worker) !== 'undefined' ) {
    const worker = new MyWorker();
    // 支持webworker
    _write = (value)=> {
        worker.postMessage(value) 
    }
    _receive = (cb)=> {
        worker.onmessage = function(e) {
            cb(e.data)
        }
    }
} else {
    const socket = io('ws://192.168.81.126:3000/'); // dev
    _write = (value)=> {
        switch (value.event) {
            case 'login':
                'login'.emit('login', value.data)
                break;
           case 'message':
                socket.emit('message', value.data)
                break;
            case 'toOne':
                socket.emit('toOne', value.data)
                break;
            case 'writeIn':
                socket.emit('writeIn', mainData.data)
                break;
            default:
                break;
        }
        
    }
    _receive = (cb)=> {
        socket.on('message',  (data) => {
            cb({data, event: 'message'})
        })

        socket.on('toOne',  (data) => {
            cb({data, event: 'toOne'})
        })

    }
}
export const write = _write
export const receive = _receive