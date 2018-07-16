CREATE TABLE users (
    id int primary key,
    name varchar(128) default null,
    email varchar(128) not null,
    password varchar(128) default null,
    token varchar(128) default null,
    role varchar(128) default null
);