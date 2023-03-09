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

    async findAllByUserId(userId) {
        return this.tickets.filter(ticket => ticket.userId === userId);
    }

    async findAllTicketsBoughtByEventId(eventId) {
        return this.tickets.filter(ticket => ticket.eventId === eventId && ticket.isApproved===true);
    }

    async approveTicket({ id, isApproved }) {
        const index = this.tickets.findIndex( t => t.id === id);
        const ticket = this.tickets[index];
        ticket.isApproved = isApproved;
        this.tickets.splice(index, 1);
        this.tickets.push(ticket);
        return ticket;
    }

    async findOneTicketById(id) {
        const ticket = this.tickets.find( ticket => ticket.id === id );
        return ticket;
    }
}

module.exports = TicketRepositoryInMemory;