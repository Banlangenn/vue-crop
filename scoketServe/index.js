const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const fs = require('fs')
// app.get('/', function(req, res){
//     res.send('<h1>Welcome Realtime Server</h1>');
// });
app.use(express.static('./../blg'))
let actionList = [] // 操作记录
// 在线用户
let onlineUsers = {}
// 当前在线人数
let onlineCount = 0
let groupOwnerId = null
io.on('connection', function(socket) {
    console.log('a user connected')
     
    // 监听新用户加入
    socket.on('login', function(obj) {
        // 将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.name = obj.userid
        const ID = socket.id
         
        // 检查在线列表，如果不在里面就加入
        if (!onlineUsers.hasOwnProperty(obj.userid)) {
            onlineUsers[obj.userid] = obj.username
            // 在线人数+1
            onlineCount++
        }
        if (obj.type == 2) {
            // 老师上线
            groupOwnerId = ID
            actionList = []
            console.log('老师重新进入房间-  重置笔记记录')
        } else {
            // 学生向老师 发送自己的id  老师socket
            console.log('学生向老师 发送自己的id  老师socket')
            // const toSocket = io.sockets.sockets[groupOwnerId]
            if (groupOwnerId && io.sockets.sockets[groupOwnerId]) {
                io.sockets.sockets[groupOwnerId].emit('toOne', { id: socket.id })
            }

        }
         
        // 向所有客户端广播用户加入
        io.emit('login', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj })
        
        console.log(obj.username + '加入了聊天室')
    })

    // 老师 向学生发送自己的 当前数据状态
    socket.on('toOne', function(msgObj) {
        // 找到学生的 socket
        console.log('有新学生上线---给学生发送自己状态')
        const { id, ...rest } = msgObj
        const toSocket = io.sockets.sockets[id]
        toSocket.emit('toOne', rest)
    })
    // 监听用户退出
    socket.on('disconnect', function() {
        // 将退出的用户从在线列表中删除
        if (onlineUsers.hasOwnProperty(socket.name)) {
            // 退出用户的信息
            const obj = { userid: socket.name, username: onlineUsers[socket.name] }
             
            // 删除
            delete onlineUsers[socket.name]
            // 在线人数-1
            onlineCount--
             
            // 向所有客户端广播用户退出
            io.emit('logout', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj })
            // console.log(obj.username+'退出了聊天室')
        }
    })
     
    // 监听用户发布聊天内容
    // 开始事件

    let startTime = 0
    socket.on('message', function(obj) {
        // 向所有客户端广播发布的消息
        // io.emit('message', obj);
        if (actionList.length == 0) {
            actionList.push({
                time: 0,
                data: obj
            })
            startTime = new Date().getTime()
        } else {
            actionList.push({
                time: new Date().getTime() - startTime,
                data: obj
            })
        }
        // 数据 动作
        // 写入文件 json 文件
        // 先写入内存  在写入文件
        socket.broadcast.emit('message', obj)
    })

    socket.on('writeIn', function(obj) {
        // 向所有客户端广播发布的消息
        // io.emit('message', obj);
        const fileName = `./time-${new Date().getTime()}.json`
        fs.writeFile(fileName, JSON.stringify(actionList, null, 4), function(err) {
            if (err) {
                console.error(err)
            }
            console.log('----------新增成功-------------文件为：' + fileName)
        })
    })
})
 
http.listen(3000, function() {
    console.log('listening on *:3000')
})
