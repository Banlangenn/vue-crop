


import io from 'socket.io-client'
// let socket = null
let _writeFnMap = []
// 发数据
addEventListener('message', function (e) {
    const value = e.data
    // 建立链接
    if (value.event == 'socketInit') {
        const { url, writeEvent, readEvent } = value.data
        const socket = io(url) // socket 形成闭包 不能够被释放 --- 我觉得 应该的  本来就不能被释放  只会执行一次
        _writeFnMap = writeEvent.reduce((p, n) => (p[n] = v => { socket.emit(n, v) },p),{})
        // 收数据
        for (const item of readEvent) {
            //  监听 
            socket.on(item,  (data) => {
                // this.readCallback({data, event: item})
                postMessage({data, event: item})
            })
        }
        return
    }
    // 发送数据
    
    const writeFn = _writeFnMap[value.event]
    if (!writeFn) {
        console.log(`readEvent 中没有 ${value.event} 事件`)
        return
    }
    writeFn(value.data)
}, false);






