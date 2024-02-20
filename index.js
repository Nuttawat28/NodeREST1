const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Database connec
mongoose.connect(
    "mongodb://admin:MPDhai27715@node58293-noderestnuttawat.proen.app.ruk-com.cloud",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const Book = mongoose.model("Book", {
    id: {
        type: Number,
        unique: true,
        require: true,
    },
    title: String,
    author: String,
});

const app = express();
app.use(bodyParser.json());

//Create
app.post("/books", async (req, res) => {
    try {
        // get the last book record to determine the next ID
        const lastBook = await Book.findOne().sort({ id: -1 });
        const nextId = lastBook ? lastBook.id + 1 : 1;

        //create a new book
        const book = new Book({
            id: nextId,
            ...req.body,
        });

        await book.save();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

//read all
app.get("/books", async (req, res) => {
    try {
        const book = await Book.find();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

//read one
app.get("/books", async (req, res) => {
    try {
        const book = await Book.findOne({id:req.params.id});
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

//update
app.put("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate({id:req.params.id}, req.body, {
            new: true,
        });
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

//delete
app.delete("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({id:req.params.id}); 
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});