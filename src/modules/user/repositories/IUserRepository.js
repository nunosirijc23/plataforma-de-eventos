const User = require('../entity/user');

class IUserRepository {
    create(User) {}
    findById(id) {}
    findByEmail(email) {}
    findByPhone(phone) {}
    updatePhoto({ photo, id }) {}
    updateUserData(user) {}
    updatePassword({ password, id }) {}
}

module.exports = IUserRepository;