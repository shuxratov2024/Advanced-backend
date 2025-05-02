const UserModel = require("../models/user.model");
const Dto = require("../controller/dtos/user.dto");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const mailService = require("./mail.service");
const UserDto = require("../controller/dtos/user.dto");
const BaseError = require("../errors/base.error");

class AuthService {
    async register(email, password) {
        const existUser = await UserModel.findOne({ email });

        if (existUser) {
            throw BaseError.BadRequest(`User already exists: email ${email} already registered`);
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ email, password: hashPassword });

        const userDto = new Dto (user)

        await mailService.sendMail(email, `${process.env.API_URL}/api/auth/activation/${userDto.id}`)
        const tokens = tokenService.generateToken({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)



        return { user: userDto , ...tokens};
        

    }
    async activation(userId){
        const user = await UserModel.findById(userId)
        if(!user) {
            throw BaseError.BadRequest("User is not defined ")
        }
        console.log("User activated")
        await user.save()
    }
    async login(email, password) {
        const user = await UserModel.findOne({email})
        if(!user) {
            throw BaseError.UnauthorizedError(`User not found: email ${email} not registered`);
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            throw BaseError.BadRequest("Invalid password");
        }
        const userDto = new Dto(user)
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { user: userDto, ...tokens };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken){
        if(!refreshToken) {
            throw BaseError.UnauthorizedError("User not authorized")
        }

        const userPayload  = tokenService.validateRefreshToken(refreshToken)
        console.log("userPayload",userPayload)
        const tokenDB = await tokenService.findToken(refreshToken)
        if(!userPayload || !tokenDB) {
            throw BaseError.BadRequest ("bad Error ")
        }
        const user = await UserModel.findById(userPayload.id)
        const userDto = new UserDto(user)

        const tokens = tokenService.generateToken({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)



        return { user: userDto , ...tokens};

    }
    async getUsers() {
        return await UserModel.find()
    }

}

module.exports = new AuthService();
