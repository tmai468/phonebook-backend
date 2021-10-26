const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Please provide password at least to connect to DB: node mongo.js <password> (required) <name> <number>")
    process.exit(1)
}

const password = process.argv[2]
let nameToAdd, numberToAdd
if (process.argv.length == 5) {
    nameToAdd = process.argv[3]
    numberToAdd = process.argv[4]}

const url = `mongodb+srv://fullstack:${password}@fso.eov2l.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

// Adding entries to phonebook

// // create a new schema to add entries
const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

// // create a model from defined schema
const Entry = mongoose.model("Entry", phonebookSchema)

// // create object from model
if (process.argv.length==5) {
const entryToAdd = new Entry({
    name: nameToAdd,
    number: numberToAdd
})
entryToAdd.save().then(response => {
    console.log(`added ${nameToAdd} number ${numberToAdd} to phonebook`)
    mongoose.connection.close()
})
} else if (process.argv.length==3) {
// Listing all existing entries from phonebook
Entry.find({}).then( response => {
    response.forEach(entry => {
        console.log(entry)
    })
    mongoose.connection.close()
})
}