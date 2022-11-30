class FindAllTicketsByUserIdUseCase {
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    async execute(userId) {
        const tickets = await this.ticketRepository.findAllByUserId(userId);
        return tickets;
    }
}

module.exports = FindAllTicketsByUserIdUseCase;

