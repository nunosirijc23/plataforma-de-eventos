const EventRepositoryInMemory = require('../../repositories/in-memory/EventRepositoryInMemory');
const FindAllEventsUseCase = require('./findAllEventsUseCase');
const CreateEventUseCase = require('../createEvent/createEventUseCase');
const ProducerRepositoryInMemory = require('../../../producer/repositories/in-memory/ProducerRepositoryInMemory');
const CreateProducerUseCase = require('../../../producer/usesCases/createProducer/createProducerUseCase');
const CategoryRepositoryInMemory = require('../../repositories/in-memory/CategoryRepositoryInMemory');
const Category = require('../../entity/category');

let eventRepositoryInMemory;
let createEventUseCase;
let producerRepositoryInMemory;
let createProducerUseCase;
let categoryRepositoryInMemory;
let findAllEventsUseCase;

describe("Find All Events Use Case", () => {
    beforeEach(() => {
        eventRepositoryInMemory = new EventRepositoryInMemory();
        createEventUseCase = new CreateEventUseCase(eventRepositoryInMemory);
        findAllEventsUseCase = new FindAllEventsUseCase(eventRepositoryInMemory);
        producerRepositoryInMemory = new ProducerRepositoryInMemory();
        createProducerUseCase = new CreateProducerUseCase(producerRepositoryInMemory);
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    })

    it("should be able to find all events by name and category id", async () => {
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
            categoryId: category.id, 
            producerId: producer.id
        });
        const events = await findAllEventsUseCase.execute({
            name: event.name,
            categoryId: event.categoryId
        });
        expect(events).toEqual([event]);
    })

    it("should be able to find all events by name", async () => {
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
            categoryId: category.id, 
            producerId: producer.id
        });
        const events = await findAllEventsUseCase.execute({
            name: event.name,
            categoryId: undefined
        });
        expect(events).toEqual([event]);
    })

    it("should be able to find all events by category id", async () => {
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
            categoryId: category.id, 
            producerId: producer.id
        });
        const events = await findAllEventsUseCase.execute({
            name: undefined,
            categoryId: event.categoryId
        });
        expect(events).toEqual([event]);
    })

    it("should be able to find all events", async () => {
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
            categoryId: category.id, 
            producerId: producer.id
        });
        const events = await findAllEventsUseCase.execute({
            name: undefined,
            categoryId: undefined
        });
        expect(events).toEqual([event]);
    })
})