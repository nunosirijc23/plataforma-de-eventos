const EventRepositoryInMemory = require('../../repositories/in-memory/EventRepositoryInMemory');
const UpdateEventPhotoUseCase = require('./updateEventPhotoUseCase');
const CreateEventUseCase = require('../createEvent/createEventUseCase');
const ProducerRepositoryInMemory = require('../../../producer/repositories/in-memory/ProducerRepositoryInMemory');
const CreateProducerUseCase = require('../../../producer/usesCases/createProducer/createProducerUseCase');
const CategoryRepositoryInMemory = require('../../repositories/in-memory/CategoryRepositoryInMemory');
const Category = require('../../entity/category');

let eventRepositoryInMemory;
let updateEventPhotoUseCase;
let createEventUseCase;
let producerRepositoryInMemory;
let createProducerUseCase;
let categoryRepositoryInMemory;

describe("Update Event Photo Use Case", () => {
    beforeEach(() => {
        eventRepositoryInMemory = new EventRepositoryInMemory();
        updateEventPhotoUseCase = new UpdateEventPhotoUseCase(eventRepositoryInMemory);
        createEventUseCase = new CreateEventUseCase(eventRepositoryInMemory);
        producerRepositoryInMemory = new ProducerRepositoryInMemory();
        createProducerUseCase = new CreateProducerUseCase(producerRepositoryInMemory);
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    })

    it("should be able to update event photo", async () => {
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
        const oldPhoto = event.photo;
        const eventUpdated = await updateEventPhotoUseCase.execute({
            photo: "newPhoto.png",
            eventId: event.id
        });
        expect(eventUpdated).not.toEqual(oldPhoto);
    })

})