const { v4: uuidV4 } = require('uuid');

const Event = require('./event');
const Category = require('./category');
const Producer = require('../../producer/entity/producer');

describe("Event Entity", () => {
    it("should be able to create a new event", () => {
        const producer = new Producer("Producer", "producer@gmail.com", "123456");
        const category = new Category("Festas"); 
        const event = new Event("Festa das cores", new Date(), new Date().getTime(), new Date().getTime(), 11000, 200, "Luanda", "Talatona", "Bairro militar", "Atros", "bla bla bla",  category.id, producer.id);
        expect(event.id).not.toBeUndefined();
    })

    it("should be able to create a new event with default photo", () => {
        const producer = new Producer("Producer", "producer@gmail.com", "123456");
        const category = new Category("Festas"); 
        const event = new Event("Festa das cores", new Date(), new Date().getTime(), new Date().getTime(), 11000, 200, "Luanda", "Talatona", "Bairro militar", "Atros", "bla bla bla", category.id, producer.id);
        expect(event.photo).toEqual("events.png");
    })

    it("should be able to set values in event", () => {
        const producer = new Producer("Producer", "producer@gmail.com", "123456");
        const category = new Category("Festas");
        const event = new Event();
        const oldId = event.id;
        event.setValues(uuidV4(), "Festa das cores!", new Date(), new Date().getTime(), new Date().getTime(), 11000, "default.png", 200, "Luanda", "Talatona", "Bairro militar", "Atros", "bla bla bla", category.id, producer.id, new Date());
        expect(event.id).not.toEqual(oldId);
    })
})