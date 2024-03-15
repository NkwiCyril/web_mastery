create table tasks (
	id serial unique primary key not null,
	content text not null,
	status varchar(10) not null,
	user_id int,
	created_time time ,
	created_date date,
	foreign key(user_id) references users(id) 
);

create table users (
	id serial unique primary key not null,
	username text not null,
	task_id int
);

select * from tasks
select * from users

select count(*) from tasks

INSERT INTO users (username, task_id)
VALUES 
    ('Jane Doe', 1),
    ('John Doe', 2);
delete from tasks where id = 6

INSERT INTO tasks (content, status, user_id, created_time, created_date)
VALUES 
    ('Continue data migration to PG database', 'inprogress', 2, '1:17:07 PM', '3/12/2024');
	
ALTER TABLE users
DROP COLUMN task_id; 
