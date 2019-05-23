--
-- 数据库：`book_crawler`
--

-- -------------------------------------------

--
-- 书籍列表
--

CREATE TABLE IF NOT EXISTS `book_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `book_code` VARCHAR(20) NOT NULL,
	`category` VARCHAR(20) NOT NULL,
  `name` VARCHAR(225) NOT NULL,
  `url` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

-- -------------------------------------------


--
-- 章节内容：`article_detail`
--

CREATE TABLE IF NOT EXISTS `article_detail` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`article_id` varchar(20) NOT NULL,
	`content` longtext NOT NULL,
	PRIMARY KEY (`id`)
)
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

-- --------------------------------------------


--
-- 文章列表：`article_list`
-- 

CREATE TABLE IF NOT EXISTS `article_list` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`title` varchar(225) NOT NULL,
	`url` text NOT NULL,
	`article_id` varchar(20) NOT NULL,
	PRIMARY KEY (`id`)
)
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;