const express = require('express');
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/Book.sqlite'
});

//define the books model
const Book = sequelize.define('book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: true, 
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//create the books table if it doesn't exist
sequelizze.sync();

//get all books
app.get('/books', (req, res) => {
    Book.findAll().them(books => {
        res.json(books);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//get a book by id
app.get('/books/:id', (req,res) => {
    Book.findByPk(req.params.id).them(book => {
    if (!book) {
        res.status(404).send('Book not found');
    } else {
        res.json(book);
    }
    }).catch(err => {
        res.status(500).send(err);
    });
});

//route to update a book
app.put('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if(!book) {
            res.status(404).send('Book not found');
        } else {
            book.update(req.body).then(() => {
                res.send(book);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

//delete a book
app.delete('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if(!book) {
            res.status(404).send('Book not found');
        } else {
            book.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

//start the server
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}...`));