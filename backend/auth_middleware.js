const { JWT_SECRET } = require("./config")
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.header.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(403).json({
            message: "Invalid"
        })
    }

    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token, JWT_SECRET)

        req.userId = decoded.userId

        next()
    }catch(err){
        return res.status(403).json({
            message: `Error ${err}`
        })
    }
}

module.exports = {
    authMiddleware
}