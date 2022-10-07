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

    async findByEmail(email) {
        const user = await this.repository.findOne({
            where: { email: email }
        });

        return user;
    }

    async findByPhone(phone) {
        const user = await this.repository.findOne({
            where: { phone }
        });

        return user;
    }
}

module.exports = UserRepository;