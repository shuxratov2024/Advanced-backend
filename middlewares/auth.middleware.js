const BaseError = require("../errors/base.error")

module.exports = function (req,res,next) {
    try {
        const authorization = req.headers.authorization
        if(!authorization) {
            return next(BaseError.UnauthorizedError("User not authorized"))
        }
        const accessToken = authorization.split(" ")[1]
        if(!accessToken) {
            return next(BaseError.UnauthorizedError("User not authorized"))
        }
        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData) {
            return next(BaseError.UnauthorizedError("User not authorized"))
        }

        res.user  = userData
        next()
    } catch (error) {
        return next(BaseError.UnauthorizedError("User not authorized"))
    }
}