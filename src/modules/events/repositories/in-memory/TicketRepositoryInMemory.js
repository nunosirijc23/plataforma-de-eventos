const ITicketRepository = require('../ITicketRepository');

class TicketRepositoryInMemory extends ITicketRepository {
    constructor() {
        super();
        this.tickets = [];
    }

    async create(ticket) {
        this.tickets.push(ticket);
        return ticket;
    }

    async findAllByEventId(eventId) {
        return this.tickets.filter(ticket => ticket.eventId === eventId );
    }
}

module.exports = TicketRepositoryInMemory;