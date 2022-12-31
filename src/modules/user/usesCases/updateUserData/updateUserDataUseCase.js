const User = require('../../entity/user');

class UpdateUserDataUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ name, email, phone, id }) {
        const user = await this.userRepository.findById(id);
        const userToUpdate = new User();
        userToUpdate.id = user.id;
        userToUpdate.name = name;
        userToUpdate.email = email;
        userToUpdate.phone = phone;
        await this.userRepository.updateUserData(userToUpdate);
        const userFetched = await this.userRepository.findById(id);
        return userFetched;
    }
}

module.exports = UpdateUserDataUseCase;