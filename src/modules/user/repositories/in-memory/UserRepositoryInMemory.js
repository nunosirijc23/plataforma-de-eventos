const IUserRepository = require("../IUserRepository");

class UserRepositoryInMemory extends IUserRepository {
    constructor() {
        super();
        this.users = [];
    }

    async create(user) {
        this.users.push(user);
        return user;
    }

    async findByEmail(email) {
        return this.users.find( user => user.email === email);
    }

    async findByPhone(phone) {
        return this.users.find( user => user.phone === phone);
    }
}

module.exports = UserRepositoryInMemory;