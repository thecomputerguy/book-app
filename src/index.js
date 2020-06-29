const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 1339

let books = []

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) =>{
    res.send("root of the express app")
})

app.get('/book/:id', (req, res) => {
    let bookId = req.params.id
    let book = books.find(book => book.id == bookId)
    if (book) {
        res.json(book)
        return
    }
    res.status(404).json({message: `book with id ${bookId} does not exist.`})
    return
})

app.get('/books', (req, res) => {
    res.status(200).json(books)
})

app.post('/book', (req, res) => {
    let book = req.body
    console.log(book)
    books.push(book)
    res.status(201).json({message: "create", book})
})

app.put('/book/:id', (req, res) => {
    let bookId = req.params.id
    let book = req.body
    
    for (let index = 0; index < books.length; index++) {
        
        if (books[index].id == bookId) {
            books[index] = book
            res.status(201).json({message: "updated", book : books[index]})
            return
        }        
    }
    res.status(404).json({message: "book does not exist"})
    return 
})

app.delete('/book/:id', (req, res) => {
    let bookId = req.params.id
    let exists = false
    for (let index = 0; index < books.length; index++) {
        if (books[index].id == bookId) {
            exists = true
            break
        }
    }

    if (exists) {
        books = books.filter(book => book.id != bookId)
        res.status(200).json({message: "deleted successfully."})
        return
    }
    res.status(404).json({message: "book does not exist"})
    return
})

app.listen(port, () => console.log(`App started on port: ${port}`))