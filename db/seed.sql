create table users (
    id serial primary key,
    email varchar(100) not null,
    f_name varchar(100) not null,
    l_name varchar(100) not null,
    password varchar(250) not null
);

create table bookmarks (
    event_id varchar(100) primary key, 
    id int references users(id), 
    name text not null,
    date varchar(100),
    image text not null
);


create table tickets (
    ticket_id serial primary key, 
    user_id int, 
    event_id varchar(100),
    name text not null,
    date varchar(100),
    image text not null, 
    venue text not null,
    city text not null,
    state text not null 
);