create database reg_app;
create role reg_admin login password 'registration';
grant all privileges on database reg_app to reg_admin;

-- insert values in tables

insert into reg_cities (reg_code,town)
values  ('NB','Bergville'),
    ('ND','Durban'),
    ('NA','Harding'),
    ('NN','Newcastle');


    -- grant 
    GRANT ALL PRIVILEGES on TABLE reg_cities TO reg_admin;
    GRANT ALL PRIVILEGES on TABLE regTest TO reg_admin;
    GRANT ALL PRIVILEGES on SEQUENCE regTest_id_seq TO reg_admin;