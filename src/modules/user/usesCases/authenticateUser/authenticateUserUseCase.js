const { compare } = require("bcrypt");

const AppErrorException = require("../../../../config/AppErrorException");
const User = require("../../entity/user");

class AuthenticateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ email, password }) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new AppErrorException("E-mail ou senha errada!");

        const isPasswordWrong = await compare(password, user.password);

        if (!isPasswordWrong) throw new AppErrorException("E-mail ou senha errada!");

        const userEntity = new User();
        userEntity.setValues(user.id, user.name, user.email, user.phone, user.photo, user.password, user.createAt);
        delete userEntity.password;
        return userEntity;
    }
}

module.exports = AuthenticateUserUseCase;