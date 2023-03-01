const AppErrorException = require("../../../../config/AppErrorException");
const Ticket = require('../../entity/ticket');

class BuyTicketUseCase {
    constructor(ticketRepository, eventRepository) {
        this.ticketRepository = ticketRepository;
        this.eventRepository = eventRepository;
    }

    async execute({ payment, userId, eventId, bankReceiptDirectory }) {
        const tickets = await this.ticketRepository.findAllByEventId(eventId);
        const ticketsBought = tickets.length;
        const event = await this.eventRepository.findOneById(eventId);

        if (ticketsBought === event.capacity) throw new AppErrorException("Bilhetes esgotados!");

        const ticket = new Ticket(payment, userId, eventId, bankReceiptDirectory, null);
        const ticketSaved = this.ticketRepository.create(ticket);
        return ticketSaved;
    }
}

module.exports = BuyTicketUseCase;