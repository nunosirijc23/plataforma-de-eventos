const ProducerRepositoryInMemory = require('../../repositories/in-memory/ProducerRepositoryInMemory');
const CreateProducerUseCase = require('../createProducer/createProducerUseCase');
const ChangeProducerPasswordUseCase = require('../changeProducerPassword/changeProducerPasswordUseCase');

let producerRepositoryInMemory;
let createProducerUseCase;
let changeProducerPasswordUseCase;

describe("Change Producer Password Use Case", () => {
    beforeEach(() => {
        producerRepositoryInMemory = new ProducerRepositoryInMemory();
        createProducerUseCase = new CreateProducerUseCase(producerRepositoryInMemory);
        changeProducerPasswordUseCase = new ChangeProducerPasswordUseCase(producerRepositoryInMemory);
    })

    it("should be able to create producer", async () => {
        const producer = await createProducerUseCase.execute({
            name: "Producer",
            email: "producer@gmail.com",
            password: "123456"
        });
        const oldPassword = producer.password;

        const producerUpdated = await changeProducerPasswordUseCase.execute({
            password: "newPassword",
            id: producer.id
        });

        expect(producerUpdated.password).not.toEqual(oldPassword);
    })

})