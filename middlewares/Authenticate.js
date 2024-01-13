var jwt = require('jsonwebtoken');
require("dotenv").config()

const Authenticate = (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if(err){
                return res.send({message : "Please login first"})
            }
            console.log(decoded)
            req.userID = decoded.userID
            next()
          });

}


module.exports = {Authenticate}