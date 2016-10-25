--
-- 数据库：`book_crawler`
--

-- -------------------------------------------

--
-- 章节内容：`article_detail`
--

CREATE TABLE IF NOT EXISTS `article_detail` (
	`id` varchar(20) NOT NULL,
	`content` longtext NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET = utf8;

-- --------------------------------------------


--
-- 文章列表：`article_list`
-- 

CREATE TABLE IF NOT EXISTS `article_list` (
	`id` varchar(20) NOT NULL,
	`title` varchar(225) NOT NULL,
	`url` text NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET = utf8;