class FindOneTicketByIdUseCase {
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    async execute(id) {
        const ticket = await this.ticketRepository.findOneTicketById(id);
        return ticket;
    }
}

module.exports = FindOneTicketByIdUseCase;