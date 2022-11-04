create table reg_cities(
	id serial not null primary key,
    reg_code text not null,
	town text not null
);


create table reg_numbers(
    id serial primary key,
    registrations text not null,
    town_id integer not null, 
    FOREIGN KEY (town_id) REFERENCES reg_cities(id)
);

-- ADDING ON TABLE 
CREATE TABLE regTest(
    id serial primary key,
    reg text not null
);

create database reg_app;
create role reg_admin login password 'registration';
grant all privileges on database reg_app to reg_admin;

-- insert values in tables

insert into reg_cities (reg_code,town)
values  ('NB','Bergville'),
    ('ND','Durban'),
    ('NA','Harding'),
    ('NN','Newcastle');


