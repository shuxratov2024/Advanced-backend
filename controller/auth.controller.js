const BaseError = require('../errors/base.error')
const authService = require('../service/auth.service')
const {validationResult} = require("express-validator")

class AuthController {
    async register (req,res,next) {
        try {
            const error = validationResult(req)
            if(!error.isEmpty()){
                return next (BaseError.BadRequest("Error with validation", error.array()))
            }
            const {email,password} = req.body
            const data = await authService.register(email,password)
            res.cookie("refreshToken", data.refreshToken,{httpOnly:true, maxAge: 30 * 24 * 60 * 60 * 1000})
            return res.json(data)
        } catch (error) {
            next(error)
        }
    }
    async activate (req,res,next) {
        try {
            const userId = req.params.id
            await authService.activation(userId)
            res.redirect("http://localhost:8080")
            return res.json({message: "User activated"})
        } catch (error) {
            next(error);
            
        }
    }
    async login (req,res,next) {
        try {
            const error = validationResult(req)
            if(!error.isEmpty()){
                return next (BaseError.BadRequest("Error with validation", error.array()))
            }
         const {email,password} = req.body 
         const data = await authService.login(email,password)
         res.cookie("refreshToken", data.refreshToken,{httpOnly:true, maxAge: 30 * 24 * 60 * 60 * 1000})
         return res.json(data)
        }
        catch (error) {
            next(error);
        }
}
    async logout (req,res,next) {
        try {
            const {refreshToken} = req.cookies
           const token =  await authService.logout(refreshToken)
            res.clearCookie("refreshToken")
            return res.json(token)
            
            
        } catch (error) {
            next(error);
        }
    }
    async refresh (req,res,next) {
        try {
            const {refreshToken} = req.cookies
            const data = await authService.refresh(refreshToken)
            res.cookie("refreshToken", data.refreshToken,{httpOnly:true, maxAge: 30 * 24 * 60 * 60 * 1000})
            return res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async getUsers(req,res,next) {
        try {
            const data = await authService.getUsers();
            return res.json(data)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new AuthController()



//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNodWtocmF0b3ZhbWlyN0BnbWFpbC5jb20iLCJpZCI6IjY4MDNhZDdjYWY4OWVhMmViNDQxOGQ3MyIsImlhdCI6MTc0NjAwODEyNywiZXhwIjoxNzQ2MDA5MDI3fQ.ZZKZaLaXgS7XaxyFcCIktBWVxyXuV7UWdtYrVvR57iU