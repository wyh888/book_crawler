var async = require('async');
var db = require('../config').db;
var debug = require('debug')('blog:update:save');

/**
 * 保存文章列表
 *
 * @param {Array} list
 * @param {Function} callback
 */
exports.articleList = function(list, callback){
  debug('保存文章列表到数据库：%d', list.length);

  async.eachSeries(list, function(item, next){
    //查询文章是否已存在
    db.query('SELECT * FROM `article_list` WHERE `id`= ? LIMIT 1', [item.id], function(err, data){
      if(err) return callback(err);

      if (Array.isArray(data) && data.length >= 1) {
          // 分类已存在，更新一下
          db.query('UPDATE `article_list` SET `title`=?, `url`=? WHERE `id`=?',
          [item.title, item.url, item.id], next);
      } else {
          // 分类不存在，添加
          db.query('INSERT INTO `article_list`(`id`, `title`, `url`) VALUES (?, ?, ?)',
          [item.id, item.title, item.url], next);
      }
    });
  }, callback);
};


/**
 * 保存文章内容
 *
 * @param {String} id
 * @param {String} content
 * @param {Function} callback
 */
exports.articleDetail = function (id, content, callback) {
  debug('保存文章内容: %s', id);

  // 检查文章是否存在
  db.query('SELECT `id` FROM `article_detail` WHERE `id`=?', [id], function (err, data) {
    if (err) return callback(err);

    if (Array.isArray(data) && data.length >= 1) {
      // 更新文章
      db.query('UPDATE `article_detail` SET `content`=? WHERE `id`=?', [content, id], callback);
    } else {
      // 添加文章
      db.query('INSERT INTO `article_detail`(`id`, `content`) VALUES (?, ?)', [id, content], callback);
    }
  });
};


/**
 * 检查文章是否存在
 *
 * @param {String} id
 * @param {Function} callback
 */
exports.isArticleExists = function (id, callback) {
  db.query('SELECT `id` FROM `article_detail` WHERE `id`=?', [id], function (err, data) {
    if (err) return callback(err);

    callback(null, Array.isArray(data) && data.length >= 1);
  });
};