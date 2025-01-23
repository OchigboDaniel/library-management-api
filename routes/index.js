const express = require('express')
const v1Rrouter = require('./v1/index')
const paymentRouter = require('./v1/payment')

const router = express.Router();

router.use('/v1', v1Rrouter)
router.use('/v1', paymentRouter)

module.exports = router