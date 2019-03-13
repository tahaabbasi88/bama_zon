DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT(4) NOT NULL,
	productname VARCHAR(100) NOT NULL,
	departmentname VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	quantity INT(20) NOT NULL,
	PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (item_id, productname, departmentname, price, quantity) 
VALUES (001, "boots", "soccer", 79.99, 20),
	   (002, "jerseys", "basketball", 99.99, 10),
	   (003, "helmet", "football", 29.99, 5),
	   (004, "sweater", "hockey", 129.99, 14),
	   (005, "pants", "football", 39.99, 15),
	   (006, "shorts", "soccer", 19.99, 19),
	   (007, "gloves", "baseball", 49.99, 11),
	   (008, "bats", "baseball", 69.99, 10),
	   (009, "pucks", "hockey", 9.99, 19),
	   (010, "shoes", "basketball", 89.99, 17)