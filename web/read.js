var async = require('async');
var db = require('../config').db;
var debug = require('debug')('blog:web:read');


/**
 * 获取文章分类列表
 *
 * @param {Function} callback
 */
exports.classList = function (callback) {
  debug('获取文章分类列表');

};


/**
 * 获取指定文章的详细信息
 *
 * @param {String} id
 * @param {Function} callback
 */
exports.article = function (id, callback) {
  debug('获取指定文章的详细信息：%s', id);

  var sql = 'SELECT * FROM `article_list` AS `A`' +
            ' LEFT JOIN `article_detail` AS `B` ON `A`.`id`=`B`.`id`' +
            ' WHERE `A`.`id`=? LIMIT 1';
  db.query(sql, [id], function (err, list) {
    if (err) return callback(err);
    if (!(list.length > 0)) return callback(new Error('该文章不存在'));

    callback(null, list[0]);
  });
};

/**
 * 获取指定分类下的文章列表
 *
 * @param {Number} offset
 * @param {Number} limit
 * @param {Function} callback
 */
exports.articleListByClassId = function (offset, limit, callback) {
	console.log(offset);
	console.log(limit);
  debug('获取指定分类下的文章列表：%s, %s', offset, limit);

  var sql = 'SELECT * FROM `article_list` AS `A`' +
            ' LEFT JOIN `article_detail` AS `B` ON `A`.`id`=`B`.`id`' +
            ' LIMIT ?,?';
  db.query(sql, [offset, limit], callback);
};
