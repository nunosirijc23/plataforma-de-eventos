const TicketRepositoryInMemory = require('./TicketRepositoryInMemory');
const UserRepositoryInMemory = require('../../../user/repositories/in-memory/UserRepositoryInMemory');
const ProducerRepositoryInMemory = require('../../../producer/repositories/in-memory/ProducerRepositoryInMemory');
const CategoryRepositoryInMemory = require('./CategoryRepositoryInMemory');
const EventRepositoryInMemory = require('./EventRepositoryInMemory');
const Ticket = require('../../entity/ticket');
const User = require('../../../user/entity/user');
const Producer = require('../../../producer/entity/producer');
const Category = require('../../entity/category');
const Event = require('../../entity/event');

let ticketRepositoryInMemory;
let userRepositoryInMemory;
let eventRepositoryInMemory;
let producerRepositoryInMemory;
let categoryRepositoryInMemory;

describe("Ticket Repository In Memory", () => {
    beforeEach(() => {
        ticketRepositoryInMemory = new TicketRepositoryInMemory();
        userRepositoryInMemory = new UserRepositoryInMemory();
        eventRepositoryInMemory = new EventRepositoryInMemory();
        producerRepositoryInMemory = new ProducerRepositoryInMemory();
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    })

    it("should be able to create ticket", async () => {
        const user = await userRepositoryInMemory.create(new User("User", "user@spread.com", 945206208, "123456"));
        const producer = await producerRepositoryInMemory.create(new Producer("producer", "producer@spread.com", "12345"));
        const category = await categoryRepositoryInMemory.create(new Category("Workshop"));
        const event = await eventRepositoryInMemory.create(new Event("NLW", new Date(), new Date().getTime(), new Date().getTime(), 0, 1000, "Sao Paulo", "Avenida Paulista", "Avenida Paulista", "13", "", category.id, producer.id));
        const ticket = await ticketRepositoryInMemory.create(new Ticket("Multicaixa Express", user.id, event.id));
        expect(ticket).not.toBeUndefined();
    })

    it("should be able to find all tickets by event id", async () => {
        const user = await userRepositoryInMemory.create(new User("User", "user@spread.com", 945206208, "123456"));
        const producer = await producerRepositoryInMemory.create(new Producer("producer", "producer@spread.com", "12345"));
        const category = await categoryRepositoryInMemory.create(new Category("Workshop"));
        const event = await eventRepositoryInMemory.create(new Event("NLW", new Date(), new Date().getTime(), new Date().getTime(), 0, 1000, "Sao Paulo", "Avenida Paulista", "Avenida Paulista", "13", "", category.id, producer.id));
        const ticket = await ticketRepositoryInMemory.create(new Ticket("Multicaixa Express", user.id, event.id));
        const ticketsFetched = await ticketRepositoryInMemory.findAllByEventId(event.id);
        expect(ticketsFetched).toEqual([ticket]);
    })
})