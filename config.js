// MYSQL数据库连接配置
var mysql = require('mysql');
exports.db = mysql.createConnection({
	host: '127.0.0.1',
	port: 3306,
	database: 'book_crawler',
	user: 'root',
	password: ''
});

// 小说配置
exports.books = [
	{ name: '诛仙', url: 'http://www.biquge.com/0_116/'}
];

// web服务器端口
exports.port = 3000;