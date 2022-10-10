const { compare } = require('bcrypt');

const Producer = require('../../entity/producer');

class AuthenticateProducerUseCase {
    constructor(producerRepository) {
        this.producerRepository = producerRepository;
    }

    async execute({ email, password }) {
        const producer = await this.producerRepository.findByEmail(email);

        if (!producer) throw new Error("email ou senha errada!");

        const isPasswordWrong = await compare(password, producer.password);

        if (!isPasswordWrong) throw new Error("email ou senha errada!");

        const producerEntity = new Producer();
        producerEntity.setValues(producer.id, producer.name, producer.email, producer.password, producer.createAt);
        delete producerEntity.password;
        return producerEntity;
    }
}

module.exports = AuthenticateProducerUseCase;