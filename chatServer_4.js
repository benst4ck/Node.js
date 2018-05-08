var net = require('net');
var chatServer = net.createServer();
var clientList = [];
chatServer.on('connection', function(client) {
  client.name = `(${client.remoteAddress}) :(${client.remotePort})`;
  client.write('Hi ' + client.name + '!\n');
  console.log(client.name + ' joined');

  clientList.push(client);
  client.on('data', function(data) {
    broadcast(data, client);  // 这个事件监听器定义在 connection事件的回调函数中 所以这里的client就是触发connection事件的tcp socket对象 data毫无疑问就来自于这个client
  })
  client.on('end', function() {  // 一个socket断开连接时会触发end事件
    console.log(client.name + ' quit');  // 在服务器打印某个连接断开的日志
    clientList.splice(clientList.indexOf(client), 1)  // 删除已经断开的连接
  })
  client.on('error', function(e) {
    console.log(e);
  })
});

function broadcast(msg, client) {
  var clearup = [];  // 需要清除的客户端添加到该列表
  for(var i=0;i<clientList.length;i+=1) {
    if(client !== clientList[i]) {
      if(clientList[i].writable) {    //检查socket是否可写
        clientList[i].write(client.name + " says " + msg);
      }else {
        // 如果socket不可写 就添加到清除列表中 同时关闭连接
        clearup.push(clientList[i]);
        clientList[i].destroy();
      }
    }
  }
  // 发现任何不可写的socket时 不仅将该socket连接关闭 同时还从clientList中移除
  for(i=0;i<clearup.length;i+=1) {
    clientList.splice(clientList.indexOf(clearup[i]), 1)
  }
}

chatServer.listen(9000);
console.log('Server is running at http://127.0.0.1:9000/');

// 命令行下 通过 ctrl + ] 进入到telnet命令界面 输入quit就可以断开链接