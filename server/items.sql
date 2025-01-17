DROP TABLE IF EXISTS items;
CREATE TABLE IF NOT EXISTS items (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR(12) NOT NULL,
    category    VARCHAR(6) NOT NULL,
    quantity        INT UNSIGNED NOT NULL,
    price           INT UNSIGNED NOT NULL
);

INSERT INTO items(id,name,category,quantity,price) VALUES (1,'Apple','fruit',12,3);
INSERT INTO items(id,name,category,quantity,price) VALUES (2,'Broccoli','vegetable',5,5);
INSERT INTO items(id,name,category,quantity,price) VALUES (3,'Milk','dairy',10,4);
INSERT INTO items(id,name,category,quantity,price) VALUES (4,'Muffin','baked',10,5);
INSERT INTO items(id,name,category,quantity,price) VALUES (5,'Chocolate','snack',16,8);
INSERT INTO items(id,name,category,quantity,price) VALUES (6,'Pineapple','fruit',7,10);
INSERT INTO items(id,name,category,quantity,price) VALUES (7,'Spinach','vegetable',6,6);
INSERT INTO items(id,name,category,quantity,price) VALUES (8,'Cheese','dairy',10,8);
INSERT INTO items(id,name,category,quantity,price) VALUES (9,'Toast','baked',13,2);
INSERT INTO items(id,name,category,quantity,price) VALUES (10,'Walnuts','snack',4,10);

SELECT * FROM items;