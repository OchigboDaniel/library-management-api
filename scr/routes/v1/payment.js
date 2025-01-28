const express = require('express')
//Import payment controller
const {initiatePayment, retrievePayment} = require('../../controllers/payment')

const router = express.Router()

/**
 * @swagger
 * /api/v1/payment/initialize:
 *  post:
 *      summary: Initialize a payment
 *      description: This endpoint initializes a payment by creating a transaction.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                              example: customer@example.com
 *                              description: The email address of the customer making the payment.
 *                          amount:
 *                              type: number
 *                              example: 5000
 *                              description: The amount to be paid in the smallest currency unit (e.g., kobo for Naira).
 *                      required:
 *                          - email
 *                          - amount
 *      responses:
 *          200:
 *              description: Payment initialized successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: boolean
 *                                  example: true
 *                              message:
 *                                  type: string
 *                                  example: "Authorization URL created"
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      authorization_url:
 *                                          type: string
 *                                          example: "https://checkout.paystack.com/ya4vjdeubx54zpb"
 *                                      access_code:
 *                                          type: string
 *                                          example: "ya4vjdeubx54zpb"
 *                                      reference:
 *                                          type: string
 *                                          example: "ho6uxgjhzi"
 *          400:
 *              description: Bad request, invalid parameters (e.g., invalid email format, negative amount)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: boolean
 *                                  example: false
 *                              message:
 *                                  type: string
 *                                  example: "Invalid email format or amount cannot be negative"
 */

router.post("/payment", initiatePayment)



/**
 * @swagger
 * /api/v1/payment/{reference}:
 *  get:
 *      summary: Retrieve a transaction status by reference
 *      description: This endpoint retrive a transactions status.
 *      
 *      responses:
 *          200:
 *              description: successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: boolean
 *                                  example: true
 *                              message:
 *                                  type: string
 *                                  example: "Transaction retrieved"
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: number
 *                                          example: 3442453453
 *                                      amount:
 *                                          type: number
 *                                          example: 4000
 * 
 *                                      currency:
 *                                          type: string
 *                                          example: "NGN"
 *                                      channel:
 *                                          type: string
 *                                          example: "card"
 *                                      reference:
 *                                          type: string
 *                                          example: "ho6uxgjhzi"
 *          400:
 *              description: Bad request, invalid parameters (e.g., invalid email format, negative amount)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: boolean
 *                                  example: false
 *                              message:
 *                                  type: string
 *                                  example: "Invalid key"
 */




router.get("/payment/:id", retrievePayment)

module.exports = router