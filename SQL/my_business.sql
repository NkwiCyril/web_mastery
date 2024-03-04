CREATE TABLE customers (
  id INT,
  first_name varchar(50),
  last_name varchar(50),
  address varchar(90),
  PRIMARY KEY (id)
);

select * from customers

INSERT INTO customers VALUES (1, 'John', 'Doe', '32 Cherry Blvd');
INSERT INTO customers VALUES (2, 'Angela', 'Yu', '12 Sunset Drive');
INSERT INTO customers VALUES (3, 'Nkwi', 'Cyril', 'Molyko-Buea');

select * from customers where last_name ='Cyril'

create table products(
	id INT NOT NULL,
	name varchar(50),
	price money,
	primary key(id)
);

select *from products
INSERT INTO products VALUES (2, 'Pencil', 0.80);
INSERT INTO products VALUES (3, 'Notebook', 2.50);
INSERT INTO products VALUES (4, 'Eraser', 0.50);
INSERT INTO products VALUES (5, 'Ruler', 1.00);
INSERT INTO products VALUES (6, 'Marker', 1.50);
INSERT INTO products VALUES (7, 'Highlighter', 1.80);
INSERT INTO products VALUES (8, 'Stapler', 3.00);
INSERT INTO products VALUES (9, 'Paper Clips', 0.30);
INSERT INTO products VALUES (10, 'Scissors', 2.20);
INSERT INTO products VALUES (11, 'Tape', 1.80);

create table orders(
	id int not null,
	order_number int,
	customer_id int,
	product_id int,
	primary key(id),
	foreign key (customer_id) references customers(id),
	foreign key (product_id) references products(id)
)

select * from orders

select orders.order_number, customers.first_name, customers.last_name, customers.address, products.name as product_name
from ((orders
inner join customers  on orders.customer_id = customers.id) 
inner join products on orders.product_id = products.id)

select * from capitals
insert into capitals (id, country, capital) values (251, 'Yahoo', 'USA')
delete from capitals where id=251