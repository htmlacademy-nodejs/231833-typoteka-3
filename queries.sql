-- Получить список всех категорий (идентификатор, наименование категории);

select * from categories;

-- Получить список категорий для которых создана минимум одна публикация (идентификатор, наименование категории);

select c.id as category_id, c.type as category_name, count(ac.article_id) as articles_count
from categories c
join articles_categories ac
on c.id = ac.category_id
group by c.id
having count(ac.article_id) >= 1
order by category_id

-- Получить список категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории);

select c.id as category_id, c.type as category_name, count(ac.article_id)
from categories c
join articles_categories ac
on c.id = ac.category_id
group by c.id
order by c.id

-- Получить список публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации;

select *
from articles
ORDER BY date DESC

-- Получить полную информацию определённой публикации (идентификатор публикации, заголовок публикации, анонс, дата публикации, путь к изображению, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);

select *
from articles
where id = 1

-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария);
select *
from comments
ORDER BY date DESC
LIMIT 5

-- Получить список комментариев для определённой публикации (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария). Сначала новые комментарии;

select c.id as comment_id, a.id as article_id, c.name, c.surname, c.text
FROM comments c
JOIN articles a
ON a.id = c.article_id
WHERE c.article_id = 1
ORDER BY c.date DESC

-- Обновить заголовок определённой публикации на «Как я встретил Новый год»;

UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE id = 1