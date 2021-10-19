const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
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
app.get('/', (request, response) => {
    response.send("<h1>Tracey Mai's Phonebook</h1>")
})
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person=persons.find(person => person.id === id)
    if (!person) {return response.status(404).end()}
    response.json(person)
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})
const generateNewId = () => {
    const maxId = 999999
    return Math.floor(Math.random() * maxId)
}
app.post('/api/persons', (request, response) => {
    console.log('here')
    const body = request.body
    console.log(body)
    if (!body.name || !body.number) {
        return response.status(404).json({
            error: 'name or number is missing'
        })
    }
    const nameExist = persons.find(person=>person.name === body.name)
    if (nameExist) {
        return response.status(404).json({
            error: 'name must be unique'
        })
    }
    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateNewId()
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})