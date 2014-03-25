// JavaScript Document
var server = require('http').createServer(function(req, res){
		res.end('chargement effectué');
	});
	
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	console.log('\n nouvel utilisateur...');
	socket.on('ordre', function (data) {
		console.log(data);
	})
});

server.listen(8080);
console.log('Waiting for order at http://192.168.0.13:8080/');

	