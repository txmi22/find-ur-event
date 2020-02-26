insert into bookmarks (event_id, id, name, date, image)
values ($1, $2, $3, $4, $5);
select * from bookmarks; 