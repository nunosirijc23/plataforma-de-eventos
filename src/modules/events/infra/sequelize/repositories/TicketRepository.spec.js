const TicketRepository = require('./TicketRepository');

let ticketRepository;

describe('Ticket Repository Sequelize', () => {
    beforeEach(() => {
        ticketRepository = new TicketRepository();
    })

    it('should be able to find all tickets by user id', async () => {
        const tickets = await ticketRepository.findAllByUserId("a249b511-5f92-4a26-af06-55d63aa50bd0");

        console.log(tickets);
    })
})