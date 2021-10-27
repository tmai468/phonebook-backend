const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log(`connecting to MongoDB at URL ${url}`)

mongoose.connect(url).then(response => {
    console.log('connected to MongoDB')
})
const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minLength: 3
    },
    number: {
        type: String,
        required: true,
        minLength: 8
    }
})
phonebookSchema.plugin(uniqueValidator)
phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

phonebookModel = mongoose.model("Entry", phonebookSchema)

module.exports = phonebookModel