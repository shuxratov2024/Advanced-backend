const UserModel = require("../models/user.model");
const Dto = require("../controller/dtos/user.dto");
const bcrypt = require("bcrypt");

class AuthService {
    async register(email, password) {
        const existUser = await UserModel.findOne({ email });

        if (existUser) {
            throw new Error(`User already exists: email ${email} already registered`);
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ email, password: hashPassword });

        const userDto = new Dto (user)

        return { userDto };
        

    }
    async activation(userId){
        const user = await UserModel.findById(userId)
        if(!user) {
            throw new Error("User is not defined ")
        }
        console.log("User activated")
        await user.save()
    }
}

module.exports = new AuthService();
