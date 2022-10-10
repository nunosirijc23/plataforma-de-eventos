const IProducerRepository = require('../IProducerRepository');

class ProducerRepositoryInMemory extends IProducerRepository {
    constructor() {
        super();
        this.producers = [];
    }

    async create(producer) {
        this.producers.push(producer);
        return producer;
    }

    async findByEmail(email) {
        return this.producers.find(producer => producer.email === email);
    }
}

module.exports = ProducerRepositoryInMemory;