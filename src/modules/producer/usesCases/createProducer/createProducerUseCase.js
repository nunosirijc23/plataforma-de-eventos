const { hash } = require('bcrypt');

const Producer = require('../../entity/producer');

class CreateProducerUseCase {
    constructor(producerRepository) {
        this.producerRepository = producerRepository;
    }

    async execute({ name, email, password }) {
        const producerExists = await this.producerRepository.findByEmail(email);

        if (producerExists) throw new Error("Já existe um usuário com este email!");

        const passwordHashed = await hash(password, 10);
        const producer = new Producer(name, email, passwordHashed);
        const producerSaved = await this.producerRepository.create(producer);
        return producerSaved;
    }
}

module.exports = CreateProducerUseCase;