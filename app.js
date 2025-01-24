const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();
const costomError = require("./utiles/customError")
const globalErrorHandler = require("./controllers/errorController") 
const apiRoute = require('./routes/index')

const swaggerUi = require("swagger-ui-express")
const swaggerJSDoc = require('swagger-jsdoc');

const app = express()

//Middleware
app.use(cors());
app.use(bodyParser.json());

const port = 3000

app.use("/api", apiRoute)



app.use(globalErrorHandler);

// Swagger definition

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: "Paystack Payment Getway API",
        version: '1.0.0',
        description: 'Api documentation',

    },
    servers:[
        {
            url: 'http://localhost:3000'                
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }
}

const options = {
    swaggerDefinition,
    
    apis: ['./routes/v1/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.all('*', (req, res, next)=>{
    const err = new costomError(`Can't find ${req.originalUrl} on the sever`, 404);
    next(err);
});

app.listen(port, () => {
    console.log("Listening on Port", port)
})

module.exports = swaggerSpec;
