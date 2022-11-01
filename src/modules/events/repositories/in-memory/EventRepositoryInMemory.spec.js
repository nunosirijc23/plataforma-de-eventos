const EventRepositoryInMemory = require('./EventRepositoryInMemory');
const CategoryRepositoryInMemory = require('./CategoryRepositoryInMemory');
const ProducerRepositoryInMemory = require('../../../producer/repositories/in-memory/ProducerRepositoryInMemory');
const Event = require('../../entity/event');
const Category = require('../../entity/category');
const Producer = require('../../../producer/entity/producer');

let eventRepositoryInMemory;
let categoryRepositoryInMemory;
let producerRepositoryInMemory;

describe("Event Repository In Memory", () => {
    beforeEach(() => {
        eventRepositoryInMemory = new EventRepositoryInMemory();
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        producerRepositoryInMemory = new ProducerRepositoryInMemory();
    })

    it("should be able to save a new event in memory", async () => {
        const producer = await producerRepositoryInMemory.create(new Producer("Producer", "producer@spread.com", "123456"));
        const category = await categoryRepositoryInMemory.create(new Category("Festas"));
        const event = await eventRepositoryInMemory.create(new Event("Festa das cores", new Date(), new Date().getTime(), new Date().getTime(), 11000, 200, "Luanda", "Talatona", "Bairro militar", "Atros", "bla bla bla", category.id, producer.id));
        expect(eventRepositoryInMemory.events).toEqual([event]);
    })

    it("should be able to find an event in memory by name, categoryId and producerId", async () => {
        const producer = await producerRepositoryInMemory.create(new Producer("Producer", "producer@spread.com", "123456"));
        const category = await categoryRepositoryInMemory.create(new Category("Festas"));
        const event = await eventRepositoryInMemory.create(new Event("Festa das cores", new Date(), new Date().getTime(), new Date().getTime(), 11000, 200, "Luanda", "Talatona", "Bairro militar", "Atros", "bla bla bla", category.id, producer.id));
        const eventFetched = await eventRepositoryInMemory.findByNameAndCategoryIdAndProducerId({
            name: event.name,
            categoryId: category.id, 
            producerId: producer.id
        });
        expect(eventFetched).toEqual(event);
    })

    it("should be able to find an event in memory by id", async () => {
        const producer = await producerRepositoryInMemory.create(new Producer("Producer", "producer@spread.com", "123456"));
        const category = await categoryRepositoryInMemory.create(new Category("Festas"));
        const event = await eventRepositoryInMemory.create(new Event("Festa das cores", new Date(), new Date().getTime(), new Date().getTime(), 11000, 200, "Luanda", "Talatona", "Bairro militar", "Atros", "bla bla bla", category.id, producer.id));
        const eventFetched = await eventRepositoryInMemory.findOneById(event.id);
        expect(eventFetched).toEqual(event);
    })

    it("should be able to find all events in memory by name, categoryId", async () => {
        const producer = await producerRepositoryInMemory.create(new Producer("Producer", "producer@spread.com", "123456"));
        const category = await categoryRepositoryInMemory.create(new Category("Festas"));
        const event = await eventRepositoryInMemory.create(new Event("Festa das cores", new Date(), new Date().getTime(), new Date().getTime(), 11000, 200, "Luanda", "Talatona", "Bairro militar", "Atros", "bla bla bla", category.id, producer.id));
        const eventFetched = await eventRepositoryInMemory.findAll({
            name: event.name,
            categoryId: category.id, 
        });
        expect(eventFetched).toEqual([event]);
    })

    it("should be able to find all events in memory by name", async () => {
        const producer = await producerRepositoryInMemory.create(new Producer("Producer", "producer@spread.com", "123456"));
        const category = await categoryRepositoryInMemory.create(new Category("Festas"));
        const event = await eventRepositoryInMemory.create(new Event("Festa das cores", new Date(), new Date().getTime(), new Date().getTime(), 11000, 200, "Luanda", "Talatona", "Bairro militar", "Atros", "bla bla bla", category.id, producer.id));
        const eventFetched = await eventRepositoryInMemory.findAll({
            name: event.name
        });
        expect(eventFetched).toEqual([event]);
    })

    it("should be able to find all events in memory", async () => {
        const producer = await producerRepositoryInMemory.create(new Producer("Producer", "producer@spread.com", "123456"));
        const category = await categoryRepositoryInMemory.create(new Category("Festas"));
        const event = await eventRepositoryInMemory.create(new Event("Festa das cores", new Date(), new Date().getTime(), new Date().getTime(), 11000, 200, "Luanda", "Talatona", "Bairro militar", "Atros", "bla bla bla", category.id, producer.id));
        const eventFetched = await eventRepositoryInMemory.findAll({ 
            name: undefined,
            categoryId: undefined 
        });
        expect(eventFetched).toEqual([event]);
    })

    it("should be able to find all events in memory by producer id", async () => {
        const producer = await producerRepositoryInMemory.create(new Producer("Producer", "producer@spread.com", "123456"));
        const category = await categoryRepositoryInMemory.create(new Category("Festas"));
        const event = await eventRepositoryInMemory.create(new Event("Festa das cores", new Date(), new Date().getTime(), new Date().getTime(), 11000, 200, "Luanda", "Talatona", "Bairro militar", "Atros", "bla bla bla", category.id, producer.id));
        const eventFetched = await eventRepositoryInMemory.findAllByProducerId(event.producerId);
        expect(eventFetched).toEqual([event]);
    })

    it("should be able to update an event", async () => {
        const producer = await producerRepositoryInMemory.create(new Producer("Producer", "producer@spread.com", "234355"));
        const category = await categoryRepositoryInMemory.create(new Category("Festa"));
        const event = await eventRepositoryInMemory.create(new Event("Festa das cores", new Date(), new Date().getTime(), new Date().getTime(), 11000, 200, "Luanda", "Talatona", "Bairro militar", "Atros", "bla bla bla", category.id, producer.id));
        const eventFetched = await eventRepositoryInMemory.findOneById(event.id);
        const eventUpdated = new Event();
        eventUpdated.setValues(eventFetched.id, "Festa na praia", new Date(), new Date().getTime(), new Date().getTime(), 15000, 600, "Luanda", "Luanda", "Ilha de luanda", "Rua 12", "Em frente do tamariz", eventFetched.categoryId, eventFetched.producerId, eventFetched.createdAt);
        const eventUpdatedSaved = await eventRepositoryInMemory.update(eventUpdated);
        expect(eventRepositoryInMemory.events).toEqual([eventUpdatedSaved]);
    })

    it("should be able to update an event photo", async () => {
        const producer = await producerRepositoryInMemory.create(new Producer("Producer", "producer@spread.com", "234355"));
        const category = await categoryRepositoryInMemory.create(new Category("Festa"));
        const event = await eventRepositoryInMemory.create(new Event("Festa das cores", new Date(), new Date().getTime(), new Date().getTime(), 11000, 200, "Luanda", "Talatona", "Bairro militar", "Atros", "bla bla bla", category.id, producer.id));
        const oldPhoto = event.photo;
        const eventFetched = await eventRepositoryInMemory.findOneById(event.id);
        const eventUpdated = await eventRepositoryInMemory.updatePhoto({ 
            photo: "newPhoto.png",
            id: eventFetched.id
        });
        expect(eventUpdated.photo).not.toEqual(oldPhoto);
    })
})