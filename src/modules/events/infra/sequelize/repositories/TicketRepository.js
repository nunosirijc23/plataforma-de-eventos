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
            bankReceiptDirectory: ticket.bankReceiptDirectory,
            isApproved: ticket.isApproved,
            createdAt: ticket.createdAt
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

    async approveTicket({ id, isApproved }) {
        const ticket = await this.repository.update({
            isApproved
        }, { 
            where: {
                id
            }
        })

        return ticket;
    }
}

module.exports = TicketRepository;