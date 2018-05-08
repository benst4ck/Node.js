// 在node环境下运行 node 'filename'

var net = require('net');  // 该模块包含了Node需要的所有TCP功能
var chatServer = net.createServer();  // 创建一个新的TCP服务器

// 调用on()方法来添加一个事件监听器 每当有新的客户端通过网络连接接入该服务器 就会触发connection事件 事件监听器就会调用指定的回调函数
chatServer.on('connection', function(client) {  // 连接事件在调用回调函数时 会传入新客户端所对应的TCP socket对象的引用(client)
  client.write('Hi!\n');  // 发送信息给对应客户端
  client.write('Bye!\n');
  client.end();   // 关闭连接
});

chatServer.listen(9000);
console.log('Server is running at http://127.0.0.1:9000/');

// 命令行访问 telnet 127.0.0.1 9000