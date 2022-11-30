const { hash } = require('bcrypt');

class ChangeUserPasswordUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ password, id }) {
        const user = await this.userRepository.findById(id);
        const passwordHashed = await hash(password, 10);
        const userFetched = await this.userRepository.updatePassword({
            password: passwordHashed,
            id: user.id
        });
        return userFetched;
    }
}

module.exports = ChangeUserPasswordUseCase;