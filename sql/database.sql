create database reg_app;
create role reg_admin login password 'registration';
grant all privileges on database reg_app to reg_admin;

-- insert values in tables

insert into reg_cities (city)
values  ('Bergville'),
    ('Durban'),
    ('Harding'),
    ('Newcastle');