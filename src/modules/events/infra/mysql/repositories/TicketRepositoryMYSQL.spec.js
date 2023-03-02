const TicketRepositoryMYSQL = require('./TicketRepositoryMYSQL');

let ticketRepositoryMYSQL;

describe('Ticket Repository MYSQL Test', () => {
    beforeEach(() => {
        ticketRepositoryMYSQL = new TicketRepositoryMYSQL();
    })

    it('should be able to find all tickets by user id', async () => {
        const tickets = await ticketRepositoryMYSQL.findAllByUserId("a249b511-5f92-4a26-af06-55d63aa50bd0");

        console.log(tickets);
    })

    it('should be able to find tickets by event id', async () => {
        const tickets = await ticketRepositoryMYSQL.findAllByEventId("63b91433-7169-45e8-84cb-b949f1cf6e85");

        console.log(tickets);
    })

    it('should be able to find tickets bought by event id', async () => {
        const tickets = await ticketRepositoryMYSQL.findAllTicketsBoughtByEventId("15aa4501-e17d-496c-91a5-ebd0137891c8");

        console.log(tickets);
    })
})