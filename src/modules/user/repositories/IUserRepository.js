const User = require('../entity/user');

class IUserRepository {
    create(User) {}
    findByEmail(email) {}
    findByPhone(phone) {}
}

module.exports = IUserRepository;