var net = require('net');
var chatServer = net.createServer();
var clientList = [];
chatServer.on('connection', function(client) {
  client.name = client.remoteAddress + ':' + client.remotePort;  // 给client对象 添加一个name属性
  client.write('Hi ' + client.name + '!\n');

  clientList.push(client);
  client.on('data', function(data) {
    broadcast(data, client);  // data为客户端发送的数据 client为发送该data的客户端
  })
});

function broadcast(msg, client) {
  for(var i=0;i<clientList.length;i+=1) {
    if(client !== clientList[i]) {  // 如果当前遍历到的元素(客户端连接)不是发送数据的客户端连接 那么就向该客户端连接发送数据
      clientList[i].write(client.name + " says " + msg)
    }
  }
}

chatServer.listen(9000);
console.log('Server is running at http://127.0.0.1:9000/');