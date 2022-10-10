const ProducerRepositoryInMemory = require('../../repositories/in-memory/ProducerRepositoryInMemory');
const AuthenticateProducerUseCase = require('./authenticateProducerUseCase');
const CreateProducerUseCase = require('../createProducer/createProducerUseCase');

let producerRepositoryInMemory;
let authenticateProducerUseCase;
let createProducerUseCase;

describe("Create Producer Use Case", () => {
    beforeEach(() => {
        producerRepositoryInMemory = new ProducerRepositoryInMemory();
        authenticateProducerUseCase = new AuthenticateProducerUseCase(producerRepositoryInMemory);
        createProducerUseCase = new CreateProducerUseCase(producerRepositoryInMemory);
    })

    it("should be able to authenticate producer", async () => {
        await createProducerUseCase.execute({
            name: "Producer",
            email: "producer@gmail.com",
            password: "123456"
        });

        const producer = await authenticateProducerUseCase.execute({ 
            email: "producer@gmail.com",
            password: "123456"
        })

        expect(producer).not.toBeUndefined();
    })

    it("should not be able to authenticate producer with wrong email", async () => {
        await createProducerUseCase.execute({
            name: "Producer",
            email: "producer@gmail.com",
            password: "123456"
        });

        let thrownError;

        try {
            await authenticateProducerUseCase.execute({ 
                email: "producr@gmail.com",
                password: "123456"
            })
        } catch (error) {
            thrownError = error;
        }

        expect(thrownError).toEqual(new Error("email ou senha errada!"));
    })

    it("should not be able to authenticate producer with wrong password", async () => {
        await createProducerUseCase.execute({
            name: "Producer",
            email: "producer@gmail.com",
            password: "123456"
        });

        let thrownError;

        try {
            await authenticateProducerUseCase.execute({ 
                email: "producer@gmail.com",
                password: "12345"
            })
        } catch (error) {
            thrownError = error;
        }

        expect(thrownError).toEqual(new Error("email ou senha errada!"));
    })
})