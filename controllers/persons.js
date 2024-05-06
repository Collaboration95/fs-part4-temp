const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/',(request,response)=>{
    Person.find({}).then(persons=>{
        response.json(persons)
    })
})

personsRouter.get('/:id',(request,response)=>{
    Person.findById(request.params.id)
    .then(person=>{
        if(person){response.json(person)}
        else{response.status(404).end()} 
    })
    .catch(error=>next(error))
})

personsRouter.post('/',(request,response,next)=>{
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
        })

})

personsRouter.put('/:id', (request, response, next) => {
    const {name,number} = request.body
    
    Person.findByIdAndUpdate(request.params.id,{name,number},{new:true,runValidators:true,context:'query'})
    .then(updatedPerson=>{
        response.json(updatedPerson)
    })
    .catch(error=>{
        return response.status(403).json({error: error.message})
    })
})


personsRouter.delete('/:id',(request,response,next)=>{
    Person.findByIdAndDelete(request.params.id)
    .then(()=>{response.status(204).end()})
    .catch(error=>next(error))
})

module.exports = personsRouter