const Producer = require('../../entity/producer');

class UpdateProducerDataUseCase {
    constructor(producerRepository) {
        this.producerRepository = producerRepository;
    }

    async execute({ name, email, id }) {
        const producer = await this.producerRepository.findById(id);

        const producerToUpdate = new Producer();
        producerToUpdate.setValues(producer.id, name, email, null, null);

        await this.producerRepository.updateProducerData(producerToUpdate);
        const producerUpdated = await this.producerRepository.findById(id);
        return producerUpdated;
    }
}

module.exports = UpdateProducerDataUseCase;
