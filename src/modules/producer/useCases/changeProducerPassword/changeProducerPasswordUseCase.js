const { hash } = require('bcrypt');

class ChangeProducerPasswordUseCase {
    constructor(producerRepository) {
        this.producerRepository = producerRepository;
    }

    async execute({ password, id }) {
        const producer = await this.producerRepository.findById(id);

        const passwordHashed = await hash(password, 10);
        const producerUpdated = await this.producerRepository.updatePassword({
            password: passwordHashed,
            id: producer.id
        });

        return producerUpdated;
    }
}

module.exports = ChangeProducerPasswordUseCase;