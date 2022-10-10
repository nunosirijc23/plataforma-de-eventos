const ProducerRepositoryInMemory = require('../../repositories/in-memory/ProducerRepositoryInMemory');
const CreateProducerUseCase = require('./createProducerUseCase');

let producerRepositoryInMemory;
let createProducerUseCase;

describe("Create Producer Use Case", () => {
    beforeEach(() => {
        producerRepositoryInMemory = new ProducerRepositoryInMemory();
        createProducerUseCase = new CreateProducerUseCase(producerRepositoryInMemory);
    })

    it("should be able to create producer", async () => {
        const producer = await createProducerUseCase.execute({
            name: "Producer",
            email: "producer@gmail.com",
            password: "123456"
        });

        expect(producer).not.toBeUndefined();
    })

    it("should not be able to create producer with email that exists", async () => {
        await createProducerUseCase.execute({
            name: "Producer",
            email: "producer@gmail.com",
            password: "123456"
        });

        let thrownError;

        try {
            await createProducerUseCase.execute({
                name: "Producer2",
                email: "producer@gmail.com",
                password: "123456123"
            });
        } catch (error) {
            thrownError = error;
        }

        expect(thrownError).toEqual(Error("já existe um usuário com este email!"));
    })
})