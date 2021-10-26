require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Entry = require('./models/entry')
const { Mongoose } = require('mongoose')
const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]
app.use(express.static('build'))
app.get('/', (request, response) => {
    response.send("<h1>Tracey Mai's Phonebook</h1>")
})
app.get('/api/persons', (request, response) => {
    Entry.find({}).then(entry => {
        response.json(entry)
    })
})

app.get('/info', (request, response) => {
    Entry.find({}).then(entry => {
        response.send(`<p>Phonebook has info for ${entry.length} people</p>
        <p>${new Date()}</p>`)
    })
})
app.get('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    // const person=persons.find(person => person.id === id)
    // if (!person) {return response.status(404).end()}
    // response.json(person)
    Entry.findById(request.params.id).then(entry => {
        if (entry) {
            response.json(entry)
        } else {
            response.status(404).end()
        }
    }).catch(error => {
        // if (error.name === 'CastError') {
        //     return response.status(400).send({ error: 'malformatted id'})
        // } else {
        //     next(error)
        // }
        console.log('here')
        next(error)
    })
})
app.post('/api/persons', (request, response) => {
    // console.log('here')
    const body = request.body
    console.log(body)
    if (!body.name || !body.number) {
        return response.status(404).json({
            error: 'name or number is missing'
        })
    }
    // const nameExist = persons.find(person=>person.name === body.name)
    // if (nameExist) {
    //     return response.status(404).json({
    //         error: 'name must be unique'
    //     })
    // }
    // Entry.find({}).then(entries => {
    //     // console.log(entry.name)
    //     entries.forEach(entry => {
    //     if (entry.name === body.name) {
    //         return response.status(404).json({
    //             error: 'name must be unique'
    //         })

    //     }
    // })
    // })
    const newPerson = new Entry({
        name: body.name,
        number: body.number,
        // id: generateNewId()
    })
    // persons = persons.concat(newPerson)
    // response.json(newPerson)
    newPerson.save().then(result => {
        response.json(result)
    })
})
app.delete('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    // persons = persons.filter(person => person.id !== id)

    // response.status(204).end()
    Entry.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const newEntry = {
        name: body.name,
        number: body.number,
    }
    Entry.findByIdAndUpdate(request.params.id, newEntry, { new: true })
    .then(entry => response.json(entry))
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'})
}
// handler of requests with unknown endpoint
app.use(unknownEndpoint)
const errorHandler = (error, req, res, next) => {
    console.error('what')
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else {
        next(error)
    }
}
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})