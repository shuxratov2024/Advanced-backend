const BaseError = require('../errors/base.error.js')

module.exports = function ( req,res,next,err) {
    console.log(err);
     
    if(err instanceof BaseError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }

    return res.status(500).json({message: "Server Error"})
}

