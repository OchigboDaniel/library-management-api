const express = require('express')

const router = express.Router()

router.get("/welcome", (req, res, next)=>{
    return res.status(200).json({
        success: true,
        message: "Welcome to Interpulse"
    })
}
)

module.exports = router