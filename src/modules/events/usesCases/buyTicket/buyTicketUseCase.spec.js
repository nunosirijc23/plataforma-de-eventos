const BuyTicketUseCase = require('./buyTicketUseCase');
const TicketRepositoryInMemory = require('../../repositories/in-memory/TicketRepositoryInMemory');
const CreateEventUseCase = require('../createEvent/createEventUseCase');
const CreateProducerUseCase = require('../../../producer/usesCases/createProducer/createProducerUseCase');
const CreateUserUseCase = require('../../../user/usesCases/createUser/createUserUseCase');
const CategoryRepositoryInMemory = require('../../repositories/in-memory/CategoryRepositoryInMemory');
const EventRepositoryInMemory = require('../../repositories/in-memory/EventRepositoryInMemory');
const ProducerRepositoryInMemory = require('../../../producer/repositories/in-memory/ProducerRepositoryInMemory');
const UserRepositoryInMemory = require('../../../user/repositories/in-memory/UserRepositoryInMemory');
const Category = require('../../entity/category');
const AppErrorException = require('../../../../config/AppErrorException');

let buyTicketUseCase;
let createEventUseCase;
let createProducerUseCase;
let createUserUseCase;
let ticketRepositoryInMemory;
let categoryRepositoryInMemory;
let eventRepositoryInMemory;
let producerRepositoryInMemory;
let userRepositoryInMemory;

describe("Buy Ticket Use Case", () => {
    beforeEach(() => {
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        eventRepositoryInMemory = new EventRepositoryInMemory();
        createEventUseCase = new CreateEventUseCase(eventRepositoryInMemory);
        producerRepositoryInMemory = new ProducerRepositoryInMemory();
        createProducerUseCase = new CreateProducerUseCase(producerRepositoryInMemory);
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
        ticketRepositoryInMemory = new TicketRepositoryInMemory();
        buyTicketUseCase = new BuyTicketUseCase(ticketRepositoryInMemory, eventRepositoryInMemory);
    })

    it("should be able to buy a ticket", async () => {
        const category = await categoryRepositoryInMemory.create(new Category("Workshops"));
        const producer = await createProducerUseCase.execute({
            name: "Producer",
            email: "producer@spread.com",
            password: "123456"
        });
        const event = await createEventUseCase.execute({
            name: "Next Level Week",
            date: new Date(),
            startTime: new Date().getTime(),
            endTime: new Date().getTime(),
            price: 0,
            capacity: 1000,
            province: "Luanda",
            county: "Talatona",
            district: "Paz e Flor",
            street: "Rua 5",
            description: "No centro de conferencia de belas",
            categoryId: category.id,
            producerId: producer.id
        });
        const user = await createUserUseCase.execute({
            name: "user",
            email: "user@spread.com",
            phone: 990332111,
            password: "123456"
        });
        const ticket = await buyTicketUseCase.execute({
            payment: "Multicaixa Express",
            eventId: event.id,
            userId: user.id
        });
        expect(ticket).not.toBeUndefined();
    })

    it("should not be able to buy event's ticket that's already sold out", async () => {
        const category = await categoryRepositoryInMemory.create(new Category("Workshops"));
        const producer = await createProducerUseCase.execute({
            name: "Producer",
            email: "producer@spread.com",
            password: "123456"
        });
        const event = await createEventUseCase.execute({
            name: "Next Level Week",
            date: new Date(),
            startTime: new Date().getTime(),
            endTime: new Date().getTime(),
            price: 0,
            capacity: 1,
            province: "Luanda",
            county: "Talatona",
            district: "Paz e Flor",
            street: "Rua 5",
            description: "No centro de conferencia de belas",
            categoryId: category.id,
            producerId: producer.id
        });
        const user = await createUserUseCase.execute({
            name: "user",
            email: "user@spread.com",
            phone: 990332111,
            password: "123456"
        });

        await buyTicketUseCase.execute({
            payment: "Multicaixa Express",
            eventId: event.id,
            userId: user.id
        });

        let thrownError = null;

        try {
            await buyTicketUseCase.execute({
                payment: "Multicaixa Express",
                eventId: event.id,
                userId: user.id
            });
        } catch (error) {
            thrownError = error;
        }

        expect(thrownError).toEqual(new AppErrorException("Bilhetes esgotados!"))
    })
})