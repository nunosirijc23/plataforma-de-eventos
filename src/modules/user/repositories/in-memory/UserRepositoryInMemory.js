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

    async findById(id) {
        const user = this.users.find(user => user.id === id);
        return user;
    }

    async findByEmail(email) {
        const user = this.users.find(user => user.email === email);
        return user;
    }

    async findByPhone(phone) {
        return this.users.find( user => user.phone === phone);
    }

    async updatePhoto({ photo, id }) {
        const index = this.users.findIndex(user => user.id === id);
        const user = this.users[index];
        user.photo = photo;
        this.users.splice(index, 1);
        this.users.push(user);
        return user;
    }

    async updateUserData(user) {
        const index = this.users.findIndex(u => u.id === user.id);
        const userToUpdate = this.users[index];
        userToUpdate.name = user.name;
        userToUpdate.email = user.email;
        userToUpdate.phone = user.phone;
        this.users.splice(index, 1);
        this.users.push(userToUpdate);
        return userToUpdate;
    }

    async updatePassword({ password, id }) {
        const index = this.users.findIndex(user => user.id === id);
        const user = this.users[index];
        user.password = password;
        this.users.splice(index, 1);
        this.users.push(user);
        return user;
    }
}

module.exports = UserRepositoryInMemory;