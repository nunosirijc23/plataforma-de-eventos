const { hash } = require('bcrypt');

const User = require("../../entity/user");
const AppErrorException = require('../../../../config/AppErrorException');

class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository =  userRepository;
    }

    async execute({ name, email, phone, password }) {
        let userExists = await this.userRepository.findByEmail(email);

        if (userExists) throw new AppErrorException("Já existe um usuário com este email!");

        userExists = await this.userRepository.findByPhone(phone);

        if (userExists) throw new AppErrorException("Já existe um usuário com este número!");

        const passwordHashed = await hash(password, 10);
        const user = new User(name, email, phone, passwordHashed);
        const userSaved = await this.userRepository.create(user);
        return userSaved;
    }
}

module.exports = CreateUserUseCase;