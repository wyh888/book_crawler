var originRequest = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('blog:update:read');

/**
 * 请求指定URL
 *
 * @param {String} url
 * @param {Function} callback
 */
function request(url, callback){
	originRequest(url, callback);
}


/**
 * 获取小说章节列表
 *
 * @params {String} url
 * @params {Function} callback
 */
exports.articleList = function(url, callback){
	debug('读取章节列表：%s', url);

	request(url, function(err, res){
		if(err) return callback(err);

		// 创建DOM操作对象
		var $ = cheerio.load(res.body.toString());

		// 读取文章列表
		var articleList = [];
		$('#list dd a').each(function(){
			var $me = $(this);
			var item = {
				title: $me.text().trim(),
				url: 'http://www.biquge.com' + $me.attr('href')
			};

			// 从URL中取出文章ID
			var s = item.url.match(/[0-9]_[0-9]+\/([0-9]+)\.html/);
			if(Array.isArray(s)) {
				item.id = s[1];
				articleList.push(item);
			}
		});

		callback(null, articleList);
	});
};


/**
 * 获取文章内容
 *
 * @param {String} url
 * @param {Function} callback
 */

exports.articleDetail = function(url, callback){
	debug('读取文章内容：%s', url);

	request(url, function(err, res){
		if(err) return callback(err);

		// 创建DOM操作对象
		var $ = cheerio.load(res.body.toString());

		// 获取文章内容
		var content = $('.content_read #content').html().trim();

		// 返回结果
		callback(null, {content: content});
	});
};