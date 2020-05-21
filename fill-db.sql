-- Create 3 users

INSERT INTO users VALUES
(DEFAULT, 'vovka1@vovka.com', 'vovka1', 'mazo1', 'password1', 'avatar1'),
(DEFAULT, 'vovka2@vovka.com', 'vovka2', 'mazo2', 'password2', 'avatar2'),
(DEFAULT, 'vovka3@vovka.com', 'vovka3', 'mazo3', 'password3', 'avatar3');

-- Create 3 categories

INSERT INTO categories VALUES
(DEFAULT, 'type1'),
(DEFAULT, 'type2'),
(DEFAULT, 'type3');

-- Create 3 articles

INSERT INTO articles VALUES
(DEFAULT, 'title1', 'photo1', '2020-05-16', 'announce1', 'fulltext1', 1),
(DEFAULT, 'title2', 'photo2', '2020-05-16', 'announce2', 'fulltext2', 2),
(DEFAULT, 'title3', 'photo3', '2020-05-16', 'announce3', 'fulltext3', 3);

INSERT INTO comments VALUES
-- 2 comments for 1 article (user1 and user2)
(DEFAULT, 'avatar1', 'name1', 'surname1', '2020-05-18', 'text1', 1, 1),
(DEFAULT, 'avatar2', 'name2', 'surname2', '2020-05-18', 'text2', 1, 2)

-- 2 comments for 2 article (user2 and user3)
(DEFAULT, 'avatar2', 'name2', 'surname2', '2020-05-18', 'text2', 2, 2),
(DEFAULT, 'avatar3', 'name3', 'surname3', '2020-05-18', 'text3', 2, 3)

-- 2 comments for 3 article (user1 and user3)
(DEFAULT, 'avatar1', 'name1', 'surname1', '2020-05-18', 'text1', 3, 1),
(DEFAULT, 'avatar3', 'name3', 'surname3', '2020-05-18', 'text3', 3, 3)

-- assign different categories for articles
INSERT INTO articles_categories VALUES
(DEFAULT, 1, 1),
(DEFAULT, 2, 1),
(DEFAULT, 1, 2),
(DEFAULT, 2, 2),
(DEFAULT, 3, 2),
(DEFAULT, 1, 3);
