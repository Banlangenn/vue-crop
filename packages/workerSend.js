
import io from 'socket.io-client'
import BlgWorker  from './webworker126.worker'

// 可以提供给任何地方用 怎么把 webwork 集成进去
export class BlgSocket {
    constructor(props) {
        this.capableWorker = false
        if (typeof(Worker) === 'undefined' ) {
            this.worker = new BlgWorker()
            // 支持webwork
            this.capableWorker = true
            this.worker.postMessage({
                event: 'socketInit',
                data: props
            })
            return
        }

        const { url, writeEvent, readEvent } = props
        this.readCallback = () => {
            console.error('还没有准备好~~')
        }
        // 这是 普通的  -- webwork 怎么办
        const socket = io(url)
        //  利用 props  去构造_read 和 _write 方法
        for (const item of readEvent) {
            //  监听 
            socket.on(item,  (data) => {
                this.readCallback({data, event: item})
            })
        }
        this.writeFnMap = writeEvent.reduce((p, n) => (p[n] = v => { socket.emit(n, v)},p),{})
    }

    read(cb){
        // 多次调用 会自动覆盖
        if (this.capableWorker) {
            this.worker.onmessage = function(e) {
                cb(e.data)
            }
            return
        }

        // 不支持 webwork
       this.readCallback = cb
    }
    write(value){
        // 多次调用 会自动覆盖
        if (this.capableWorker) {
            this.worker.postMessage(value)
            return
        }

        // 不支持 webwork
        const writeFn = this.writeFnMap[value.event]
        if (!writeFn) {
            console.log(`readEvent 中没有 ${value.event} 事件`)
            return
        }
        writeFn(value.data)
    }
}

