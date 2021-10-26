const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(`connecting to MongoDB at URL ${url}`)

mongoose.connect(url).then(response => {
    console.log('connected to MongoDB')
})
const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})
phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Entry", phonebookSchema)