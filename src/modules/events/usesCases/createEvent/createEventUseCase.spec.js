const EventRepositoryInMemory = require('../../repositories/in-memory/EventRepositoryInMemory');
const CreateEventUseCase = require('./createEventUseCase');
const ProducerRepositoryInMemory = require('../../../producer/repositories/in-memory/ProducerRepositoryInMemory');
const CreateProducerUseCase = require('../../../producer/usesCases/createProducer/createProducerUseCase');
const CategoryRepositoryInMemory = require('../../repositories/in-memory/CategoryRepositoryInMemory');
const Category = require('../../entity/category');

let eventRepositoryInMemory;
let createEventUseCase;
let producerRepositoryInMemory;
let createProducerUseCase;
let categoryRepositoryInMemory;

describe("Create Event Use Case", () => {
    beforeEach(() => {
        eventRepositoryInMemory = new EventRepositoryInMemory();
        createEventUseCase = new CreateEventUseCase(eventRepositoryInMemory);
        producerRepositoryInMemory = new ProducerRepositoryInMemory();
        createProducerUseCase = new CreateProducerUseCase(producerRepositoryInMemory);
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    })

    it("should be able to create a new event", async () => {
        const category = await categoryRepositoryInMemory.create(new Category("Festas"));
        const producer = await createProducerUseCase.execute({
            name: "Producer",
            email: "producer@gmail.com",
            password: "12345"
        });
        const event = await createEventUseCase.execute({
            name: "Festa das cores", 
            date: new Date(), 
            startTime: new Date().getTime(), 
            endTime: new Date().getTime(), 
            price: 11000, 
            capacity: 200, 
            province: "Luanda", 
            county: "Talatona", 
            district: "Bairro militar", 
            street: "Atros", 
            description: "bla bla bla",
            categoryId: category.id, 
            producerId: producer.id
        });
        expect(event.id).not.toBeUndefined();
    })

    it("should not be able to create an event with exists name", async () => {
        const category = await categoryRepositoryInMemory.create(new Category("Festas"));
        const producer = await createProducerUseCase.execute({
            name: "Producer",
            email: "producer@gmail.com",
            password: "12345"
        });
        const event = await createEventUseCase.execute({
            name: "Festa das cores", 
            date: new Date(), 
            startTime: new Date().getTime(), 
            endTime: new Date().getTime(), 
            price: 11000, 
            capacity: 200, 
            province: "Luanda", 
            county: "Talatona", 
            district: "Bairro militar", 
            street: "Atros", 
            description: "bla bla bla",
            categoryId: category.id, 
            producerId: producer.id
        });
        let thrownError 

        try {
            await createEventUseCase.execute({
                name: "Festa das cores", 
                date: new Date(), 
                startTime: new Date().getTime(), 
                endTime: new Date().getTime(), 
                price: 11000, 
                capacity: 200, 
                province: "Luanda", 
                county: "Talatona", 
                district: "Bairro militar", 
                street: "Atros", 
                description: "bla bla bla",
                categoryId: category.id, 
                producerId: producer.id
            });
        } catch (error) {
           thrownError = error; 
        }
        expect(thrownError).toEqual(new Error("Já existe um evento com este nome!"));
    })
})