const User = require('../entity/user');

class IUserRepository {
    create(User) {}
    findByEmail(email) {}
}

module.exports = IUserRepository;