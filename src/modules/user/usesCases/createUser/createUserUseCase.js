const { hash } = require('bcrypt');

const User = require("../../entity/user");

class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository =  userRepository;
    }

    async execute({ name, email, phone, password }) {
        const userExists = await this.userRepository.findByEmail(email);

        if (userExists) {
            throw Error("Usuário já existe!");
        }

        const passwordHashed = await hash(password, 10);
        const user = new User(name, email, phone, passwordHashed);
        const userSaved = await this.userRepository.create(user);
        delete userSaved.password;
        return userSaved;
    }
}

module.exports = CreateUserUseCase;