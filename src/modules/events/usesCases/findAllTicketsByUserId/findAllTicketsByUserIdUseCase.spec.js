const BuyTicketUseCase = require('../buyTicket/buyTicketUseCase');
const FindAllTicketsByUserIdUseCase = require('./findAllTicketsByUserIdUseCase');
const TicketRepositoryInMemory = require('../../repositories/in-memory/TicketRepositoryInMemory');
const CreateEventUseCase = require('../createEvent/createEventUseCase');
const CreateProducerUseCase = require('../../../producer/usesCases/createProducer/createProducerUseCase');
const CreateUserUseCase = require('../../../user/usesCases/createUser/createUserUseCase');
const CategoryRepositoryInMemory = require('../../repositories/in-memory/CategoryRepositoryInMemory');
const EventRepositoryInMemory = require('../../repositories/in-memory/EventRepositoryInMemory');
const ProducerRepositoryInMemory = require('../../../producer/repositories/in-memory/ProducerRepositoryInMemory');
const UserRepositoryInMemory = require('../../../user/repositories/in-memory/UserRepositoryInMemory');
const Category = require('../../entity/category');

let buyTicketUseCase;
let findAllTicketsByUserIdUseCase;
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
        findAllTicketsByUserIdUseCase = new FindAllTicketsByUserIdUseCase(ticketRepositoryInMemory);
    })

    it("should be able to find all tickets by user id", async () => {
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
        const ticketFetched = await findAllTicketsByUserIdUseCase.execute(user.id);
        expect(ticketFetched).toEqual([ticket]);
    })
})