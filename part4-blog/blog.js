// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');

// const express = require('express')
// const app = express()
// const cors = require('cors')
// const mongoose = require('mongoose')
// require('dotenv').config()

// const blogSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number
// })

// const Blog = mongoose.model('Blog', blogSchema)  // Blog model


// const mongoUrl = process.env.MONGODB_URI
// mongoose.connect(mongoUrl)
//     .then(result=>{
//         console.log('connected to MongoDB')
//     })
//     .catch((error) => {
//         console.log('error connecting to MongoDB:', error.message)
//     })

// app.use(cors())
// app.use(express.json())

// app.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>')
//     })

// app.get('/api/blogs', (request, response) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

// app.post('/api/blogs', (request, response) => {

//   const blog = new Blog(request.body)
//   console.log(request.body)
// //   blog
// //     .save()
// //     .then(result => {
// //       response.status(201).json(result)
// //     })
// })

// const PORT = 3003
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })


// const express  = require('express')
// const app = express()
// const cors = require('cors')
// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({ extended: true })); 
// require('dotenv').config()


// app.get('/', (request, response) => {
//     response.send('<h1>Hello WorldTest!</h1>')
// })

// app.get('/api/info', (request, response) => {
//     response.status(200).send('<h1>Info page</h1>')
// })

// app.post('/api/blogs' , (request, response) => {
//     console.log(request)
//     response.json(request.body)
// })

// const PORT = process.env.PORT || 3003   
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();

app.get('/', (request, response) => {
    response.send('<h1>Hello WorldTest!</h1>');
});

app.get('/api/info', (request, response) => {
    response.status(200).send('<h1>Info page</h1>');
});

app.post('/api/blogs', (request, response) => {
    console.log(request.body);
    response.json(request.body);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

