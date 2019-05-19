// MYSQL数据库连接配置
var mysql = require('mysql');
exports.db = mysql.createConnection({
	host: '127.0.0.1',
	port: 3306,
	database: 'book_crawler',
	user: 'root',
	password: '123456'
});

// 小说配置
exports.books = [
	{ name: '三寸人间', url: 'http://www.xbiquge.la/10/10489/' }
];

// web服务器端口
exports.port = 3000;