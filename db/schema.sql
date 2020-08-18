DROP DATABASE IF EXISTS budget_db;

create database budget_db;

use budget_db;


create table categories(
id int not null auto_increment key,
category varchar(30)
);

create table users(
id int not null auto_increment,
email varchar(100),
password varchar(100),
budget int not null,
primary key (id)
);

create table expenses(
id int not null auto_increment key,
description varchar(250),
amount int not null,
FOREIGN KEY (id) REFERENCES categories(id),
FOREIGN KEY (id) REFERENCES users(id)
);