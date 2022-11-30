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

    async findById(id) {
        return this.producers.find(producer => producer.id === id);
    }

    async findByEmail(email) {
        return this.producers.find(producer => producer.email === email);
    }

    async updateProducerData(producer) {
        const index = this.producers.findIndex(p => p.id === producer.id);
        const producerToUpdate = this.producers[index];
        producerToUpdate.name = producer.name;
        producerToUpdate.email = producer.email;
        this.producers.splice(index, 1);
        this.producers.push(producerToUpdate);
        return producerToUpdate;
    }

    async updatePassword({ password, id }) {
        const index = this.producers.findIndex(p => p.id === id);
        const producerToUpdate = this.producers[index];
        producerToUpdate.password = password;
        this.producers.splice(index, 1);
        this.producers.push(producerToUpdate);
        return producerToUpdate; 
    }
}

module.exports = ProducerRepositoryInMemory;