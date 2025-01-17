// Imoprts the npm-package sqlite3
const sqlite = require('sqlite3').verbose();
// Connects the database file with the name gik339.db
const db = new sqlite.Database('./gik339.db');

// Variable express imports the npm-package express
const express = require('express');
// Variable that holds the server object
const server = express();

// With server.use() the servers overall settings are set
server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');

    next();
  });

// The server is started with the method .listen on port 3000
// A callbackfunktion that writes to the console when the server starts
server.listen(3000, () => {
    console.log('The server is running on http://localhost:3000');
});

// A .get method with the endpoint /items
// The .get method has a callbackfunction in the form of an arrowfunktion with the parameters req and res
server.get('/items', (req, res) => {
    // Gets all items from the database table
    const sql = 'SELECT * FROM items';
    // The database funktion all() asks the database a question 
    // First argument is sql, which gets all lines from the table users in the database
    // Second argument is a callbackfunktion in the form of an arrow-function with the parameters err and rows 
    // err contains errors while rows contains actuall data from the database when everything goes right 
    db.all(sql, (err, rows) => {
        if (err) {
            // Writes the error to the console
            console.log(err);
            // Status code to the user informing about an error
            res.status(500).send(err);
        } else {
            // An answer sent to the user when the question has processed
            res.send(rows);
        }
    });
});

// A .get method with the endpoint /items/:id
// The .get method has a callbackfunction in the form of an arrowfunktion with the parameters req and res
server.get('/items/:id', (req, res) => {
    // Writes the items' id to the variable id
    const id = req.params.id;
    // Gets a specific item from the database table by its id
    const sql = `SELECT * FROM items WHERE id=${id}`;

    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            // An answer with the item selected by its id
            res.send(rows[0]);
        }
    });
});

// A .put method with the endpoint /items
// The .put method has a callbackfunction in the form of an arrowfunktion with the parameters req and res
server.put('/items', (req, res) => {
    // Gets the request-object's body and writes it to the variable bodyData
    const bodyData = req.body;
    // Gets the id from the request-object's body and writes it to the variable id
    const id = bodyData.id;
    // Gets the item's data and writes it to the variable item
    const item = {
        name: bodyData.name,
        category: bodyData.category,
        quantity: bodyData.quantity,
        price: bodyData.price
    };

    // An empty string is written to the variable
    let updateString = '';
    // Gets the item object's keys and writes it to the varaible
    const columnsArray = Object.keys(item);
    // The string is created using a forEach loop that creates an array of the objects
    columnsArray.forEach((column, i) => {
        // The empty string is updated
        // This shows how the string will be written
        updateString += `${column}= "${item[column]}"`;
        // If there are more than one columns, ", " is added between
        if (i !== columnsArray.length - 1) updateString += ', ';
    });

    // Updates the item with the new data using id 
    const sql = `UPDATE items SET ${updateString} WHERE id=${id}`;

    db.run(sql, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            // An answer about the updated item
            res.send('The item has been updated');
        }
    });
});

// A .post method with the endpoint /items
// The .post method has a callbackfunction in the form of an arrowfunktion with the parameters req and res
server.post('/items', (req, res) => {
    const item = req.body;
    // Adds a new item to the items table and writes it to the sql varaible
    const sql = `INSERT INTO items(name, category, quantity, price) VALUES (?,?,?,?)`;

    db.run(sql, Object.values(item), (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            // An answer about the added item
            res.send('Item added');
        }
    });
});

// A .delete method with the endpoint /items/:id
// The .delete method has a callbackfunction in the form of an arrowfunktion with the parameters req and res
server.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    // Deletes an item from the items table by the id
    const sql = `DELETE FROM items WHERE id=${id}`;

    db.run(sql, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            // An answer about the deleted item
            res.send('Item deleted');
        }
    });
});