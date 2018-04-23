create database bamazon;

use bamazon;

create table products(
item_id int not null auto_increment,
product_name varchar(50) not null,
department_name varchar(50) not null,
price integer(10),
stock_quantity integer(10),
primary key(item_id)
);
select * from products;

insert into products(product_name, department_name, price, stock_quantity)
values("Lawn Chairs", "Outdoor", 80, 60), ("Flat Screen TV", "Electronics", 500, 200), ("Sweater", "Clothing", 20, 100);

insert into products(product_name, department_name, price, stock_quantity)
values("Barbie Doll", "Toys", 10, 50),("Chew Toy", "Pets", 15, 50),("Cereal", "Food", 5, 100);

insert into products(product_name, department_name, price, stock_quantity)
values("Pens", "Office", 7, 100), ("Treadmill","Workout", 150, 30), ("Vacuum", "Cleaning",100, 50), ("Lipstick", "Beauty", 10, 100);