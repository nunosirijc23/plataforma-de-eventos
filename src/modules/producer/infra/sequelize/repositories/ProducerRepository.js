const Producer = require('../model/producer');
const IProducerRepository = require('../../../repositories/IProducerRepository');

class ProducerRepository extends IProducerRepository {
    constructor() {
        super();
        this.repository = Producer;
    }

    async create(producer) {
        const producerSaved = await this.repository.create({
            id: producer.id,
            name: producer.name,
            email: producer.email,
            password: producer.password,
            createAt: producer.createAt
        });

        return await producerSaved.save();
    }

    async findById(id) {
        const producer = await this.repository.findOne({ where: { id } });
        return producer;
    }

    async findByEmail(email) {
        const producer = await this.repository.findOne({ where: { email } });
        return producer;
    }

    async updateProducerData(producer) {
        const producerUpdated = await this.repository.update({
            name: producer.name,
            email: producer.email
        }, {
            where: {
                id: producer.id
            }
        });

        return producerUpdated;
    }

    async updatePassword({ password, id }) {
        const producer = await this.repository.update({
            password
        }, {
            where: { id }
        })

        return producer;
    }
}

module.exports = ProducerRepository;