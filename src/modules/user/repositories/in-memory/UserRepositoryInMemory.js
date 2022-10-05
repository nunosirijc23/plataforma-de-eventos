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
        const user = this.users.find( user => user.email === email);
        return user;
    }
}

module.exports = UserRepositoryInMemory;