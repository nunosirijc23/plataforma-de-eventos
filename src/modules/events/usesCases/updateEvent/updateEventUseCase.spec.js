const EventRepositoryInMemory = require('../../repositories/in-memory/EventRepositoryInMemory');
const UpdateEventUseCase = require('./updateEventUseCase');
const CreateEventUseCase = require('../createEvent/createEventUseCase');
const ProducerRepositoryInMemory = require('../../../producer/repositories/in-memory/ProducerRepositoryInMemory');
const CreateProducerUseCase = require('../../../producer/usesCases/createProducer/createProducerUseCase');
const CategoryRepositoryInMemory = require('../../repositories/in-memory/CategoryRepositoryInMemory');
const Category = require('../../entity/category');
const AppErrorException = require('../../../../config/AppErrorException');

let eventRepositoryInMemory;
let updateEventUseCase;
let createEventUseCase;
let producerRepositoryInMemory;
let createProducerUseCase;
let categoryRepositoryInMemory;

describe("Update Event Use Case", () => {
    beforeEach(() => {
        eventRepositoryInMemory = new EventRepositoryInMemory();
        updateEventUseCase = new UpdateEventUseCase(eventRepositoryInMemory);
        createEventUseCase = new CreateEventUseCase(eventRepositoryInMemory);
        producerRepositoryInMemory = new ProducerRepositoryInMemory();
        createProducerUseCase = new CreateProducerUseCase(producerRepositoryInMemory);
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    })

    it("should be able to update an event", async () => {
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
        const eventUpdated = await updateEventUseCase.execute({
            id: event.id,
            name: "Festa na praia",
            date: new Date(),
            startTime: new Date().getTime(),
            endTime: new Date().getTime(),
            price: 15000,
            capacity: 600, 
            province: "Luanda",
            county: "Luanda",
            district: "Ilha de luanda",
            street: "Rua 12",
            description: "Dress code: All white",
            categoryId: event.categoryId
        })
        expect(eventUpdated.id).toEqual(event.id);
    })
})