const ITicketRepository = require("../../../repositories/ITicketRepository");
const Ticket = require('../model/ticket');

class TicketRepository extends ITicketRepository {
    constructor() {
        super();
        this.repository = Ticket;
    }

    async create(ticket) {
        const ticketSaved = await this.repository.create({
            id: ticket.id,
            payment: ticket.payment,
            userId: ticket.userId,
            eventId: ticket.eventId,
            createAt: ticket.createdAt
        });

        return await ticketSaved.save();
    }

    async findAllByEventId(eventId) {
        const tickets = await this.repository.findAll({ 
            where: { eventId },
            include: "user"
        });
        return tickets;
    }

    async findAllByUserId(userId) {
        const tickets = await this.repository.findAll({ 
            where: { userId },
            include: "event"
        });

        return tickets;
    }
}

module.exports = TicketRepository;