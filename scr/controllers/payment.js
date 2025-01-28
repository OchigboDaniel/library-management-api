const { request } = require("express");
const asyncErrorHandler = require("../utiles/asyncErrorHandler")

const axios = require('axios')

const initiatePayment = asyncErrorHandler( async (req, res)=> {
    // Get User Data
    const {email, amount} = req.body;
    // Store the data in the variable
    const data = {
        email,
        // converting to kobo
        amount: amount * 100
    }

    const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        data,
        {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRETE_KEY}`,
                'Content-Type': 'application/json'
            }
        }
        );
        res.status(200).json(
            response.data
        )            
}
)

const retrievePayment = asyncErrorHandler( async (req, res)=> {
    // Etract id from the url
    const { reference } = req.params;
    const url = `https://api.paystack.co/transaction/verify/${reference}`;

    const response = await axios.get( url,
        {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRETE_KEY}`,
            }
        }
        );
        return res.status(200).json(
            {
                "data": response.data }
        )            
}
)

module.exports = { initiatePayment, retrievePayment}
