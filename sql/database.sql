create database reg_app;
create role reg_admin login password 'registration';
grant all privileges on database reg_app to reg_admin;

-- insert values in tables

insert into reg_cities (reg_code,town)
values  ('NB','Bergville'),
    ('ND','Durban'),
    ('NA','Harding'),
    ('NN','Newcastle');


-- database for my unit tests
create database reg_test;
create role reg_test_admin login password 'registration';
grant all privileges on database reg_test to reg_test_admin;