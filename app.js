const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();
const costomError = require("./utiles/customError")
const globalErrorHandler = require("./controllers/errorController") 
const apiRoute = require('./routes/index')

const app = express()

//Middleware
app.use(cors());
app.use(bodyParser.json());

const port = 3000

app.use("/api", apiRoute)
app.all('*', (req, res, next)=>{
    const err = new costomError(`Can't find ${req.originalUrl} on the sever`, 404);
    next(err);
});

app.use(globalErrorHandler);

app.listen(port, () => {
    console.log("Listening on Port", port)
})
