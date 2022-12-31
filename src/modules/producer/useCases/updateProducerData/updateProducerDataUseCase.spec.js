const ProducerRepositoryInMemory = require('../../repositories/in-memory/ProducerRepositoryInMemory');
const CreateProducerUseCase = require('../createProducer/createProducerUseCase');
const UpdateProducerDataUseCase = require('./updateProducerDataUseCase');

let producerRepositoryInMemory;
let createProducerUseCase;
let updateProducerDataUseCase;

describe("Update Producer Use Case", () => {
    beforeEach(() => {
        producerRepositoryInMemory = new ProducerRepositoryInMemory();
        createProducerUseCase = new CreateProducerUseCase(producerRepositoryInMemory);
        updateProducerDataUseCase = new UpdateProducerDataUseCase(producerRepositoryInMemory);
    })

    it("should be able to create producer", async () => {
        const producer = await createProducerUseCase.execute({
            name: "Producer",
            email: "producer@gmail.com",
            password: "123456"
        });


        const producerUpdated = await updateProducerDataUseCase.execute({
            name: "New Producer",
            email: "newProducerEmail@gmail.com",
            id: producer.id
        });

        expect(producerUpdated.id).toEqual(producer.id);
    })

})