const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')
const app = require('../app')
const config = require('../utils/config')
const logger = require('../utils/logger')

app.use(express.static('dist'))
app.use(express.json())

app.use(cors())
app.use(express.json())

morgan.token('requestData', (req) => {
    return JSON.stringify(req.body);
  });
  
  // Use the custom token in Morgan format
  app.use(morgan(':method :url :status :response-time ms - :res[content-length] :requestData'));
  
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

const PORT = config.PORT
app.listen(PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})