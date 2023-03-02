class FindAllTicketsByEventIdUseCase {
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    async execute(eventId) {
        const tickets = await this.ticketRepository.findAllByEventId(eventId);
        return tickets;
    }
}

module.exports = FindAllTicketsByEventIdUseCase;