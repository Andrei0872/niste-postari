create table "user" (
  id serial primary key,
  username varchar(80) unique not null,
  password varchar(65) not null
);

create table posts (
  id serial primary key,
  title varchar(100) not null,
  body text not null,
  image_url varchar(2000) not null,
  
  poster_id int not null,
  constraint fk_poster_id foreign key(poster_id) references "user"(id) on delete cascade
);