const express = require('express');
const app = express()



app.use("/api", apiRoute)



app.use(globalErrorHandler);






module.exports = app
