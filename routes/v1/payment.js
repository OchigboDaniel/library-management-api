const express = require('express')
//Import payment controller
const {initiatePayment, retrievePayment} = require('../../controllers/payment')

const router = express.Router()

router.post("/payment", initiatePayment)

router.get("/payment/:id", retrievePayment)

module.exports = router