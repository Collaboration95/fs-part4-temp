const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())

app.use(cors())
app.use(express.json())

morgan.token('requestData', (req) => {
    return JSON.stringify(req.body);
  });
  
  // Use the custom token in Morgan format
  app.use(morgan(':method :url :status :response-time ms - :res[content-length] :requestData'));
  

app.get('/',(request,response)=>{
    response.send('<h1>Hello World</h1>')
})

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

app.get('/api/persons',(request,response)=>{
    Person.find({}).then(persons=>{
       response.json(persons) 
    })
})

app.get('/info',(request,response)=>{
    const date = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id',(request,response)=>{
    Person.findById(request.params.id).then(person=>{
        if(person){response.json(person)}
        else{response.status(404).end()}
    }) 
    .catch(error=>next(error))
    .catch(
        error=>{console.log(error)
            response.status(400).send({error: 'malformatted id'})
        }
    )
})

app.delete('/api/persons/:id',(request,response)=>{
    Person.findByIdAndDelete(request.params.id)
    .then(result=>{response.status(204).end()})
    .catch(error=>next(error))
})

app.post('/api/persons',(request,response,next)=>{

    const body = request.body

    if(!body.name || !body.number){
        return response.status(400).json({error: 'name or number missing'})
    }

    const person_temp = new Person
    ({
        name: body.name,
        number: body.number
    })

    person_temp.save({runValidators:true}).then(savedPerson=>{
        return response.json(savedPerson).status(200)
    })
    .catch(error=>{
        return response.status(403).json({error: error.message})
    }
    )
})

app.put('/api/persons/:id', (request, response, next) => {
    const {name,number} = request.body

    Person.findByIdAndUpdate(request.params.id,{name,number},{new:true,runValidators:true,context:'query'})
    .then(updatedPerson=>{
        response.json(updatedPerson)
    })
    .catch(error=>{
        return response.status(403).json({error: error.message})
    })
  })

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    else{
        console.log(error)
        return response.status(200).send({error: 'Catch all'})
    }
  
    next(error)
  }
  

  app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})