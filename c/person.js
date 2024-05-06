const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    number: String
})

personSchema.set('toJSON',{
    transform: (document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)


// // require('dotenv').config();
// // mongoose.set('strictQuery', false)
// // const url = process.env.MONGODB_URI


// mongoose.connect(url)
//     .then(result=>
//         {
//             console.log('connected to MongoDB')
//         }
//     )
//     .catch((error) => {
//         console.log(process.env.MONGODB_URI)
//         console.log('error connecting to MongoDB:', error.message)
//       })


