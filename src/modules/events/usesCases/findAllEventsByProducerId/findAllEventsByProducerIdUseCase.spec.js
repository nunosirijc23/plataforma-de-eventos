const EventRepositoryInMemory = require('../../repositories/in-memory/EventRepositoryInMemory');
const FindAllEventsByProducerIdUseCase = require('./findAllEventsByProducerIdUseCase');
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
let findAllEventsByProducerIdUseCase;

describe("Find All Events By Producer Id Use Case", () => {
    beforeEach(() => {
        eventRepositoryInMemory = new EventRepositoryInMemory();
        createEventUseCase = new CreateEventUseCase(eventRepositoryInMemory);
        findAllEventsByProducerIdUseCase = new FindAllEventsByProducerIdUseCase(eventRepositoryInMemory);
        producerRepositoryInMemory = new ProducerRepositoryInMemory();
        createProducerUseCase = new CreateProducerUseCase(producerRepositoryInMemory);
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    }) 

    it("should be to find all events by producer id", async () => {
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
        const events = await findAllEventsByProducerIdUseCase.execute(producer.id);
        expect(events).toEqual([event]);
    })
})