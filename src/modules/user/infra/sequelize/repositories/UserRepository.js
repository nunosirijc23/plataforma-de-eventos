const User = require('../model/user');
const IUserRepository = require("../../../repositories/IUserRepository");

class UserRepository extends IUserRepository {
    constructor() {
        super();
        this.repository = User;
    }

    async create(user) {
        const userSaved = await this.repository.create({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            photo: user.photo,
            password: user.password,
            createAt: user.createAt
        })
        
        return await userSaved.save();
    }

    async findById(id) {
        const user = await this.repository.findOne({
            where: { id }
        });

        return user;
    }

    async findByEmail(email) {
        const user = await this.repository.findOne({
            where: { email }
        });

        return user;
    }

    async findByPhone(phone) {
        const user = await this.repository.findOne({
            where: { phone }
        });

        return user;
    }

    async updatePhoto({ photo, id }) {
        const user = await this.repository.update({
            photo
        }, {
            where: { id }
        });

        return user;
    }

    async updateUserData(user) {
        const user = await this.repository.update({
            name: user.name,
            email: user.email, 
            phone: user.phone
        }, {
            where: { id: user.id }
        });

        return user;
    }

    async updatePassword({ password, id }) {
        const user = await this.repository.update({
            password
        }, {
            where: { id }
        });

        return user;
    }
}

module.exports = UserRepository;