var net = require('net');
var chatServer = net.createServer();
var clientList = [];
chatServer.on('connection', function(client) {
  client.write('Hi!\n');
  clientList.push(client);  // 将连接到服务器的TCP socket对象都添加到clientList数组中

  client.on('data', function(data) {  // 在connection回调函数的作用域内添加事件监听器 这样就可以访问到连接事件所对应的client对象
                                      // 这个事件监听器关注的是data事件 每当client发送数据给服务器时 data事件都会被触发
                                      // 删掉了client.end() 是因为如果关闭了和客户端的连接 就无法获取新的数据了
    for(var i=0;i<clientList.length;i++) {
      // 将数据发送给所有客户端 包括数据的发送者
      clientList[i].write(data);
    }
    // 在服务器端打印接收到的数据
    console.log(data.toString());     // JS不能很好的处理二进制数据 node特地增加了一个Buffer库来帮助服务器
                                      // 通过调用toString()方法可以将Buffer的十六进制数据转换为可读的字符串
  })
});

chatServer.listen(9000);
console.log('Server is running at http://127.0.0.1:9000/');