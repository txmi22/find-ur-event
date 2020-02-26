insert into tickets (
    user_id, 
    event_id,
    name,
    date,
    image, 
    venue,
    city,
    state 
)
values ($1, $2, $3, $4, $5, $6, $7, $8);