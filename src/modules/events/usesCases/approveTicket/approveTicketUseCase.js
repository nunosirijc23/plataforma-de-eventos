
class ApproveTicketUseCase {
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    async execute({ id, isApproved }) {
        const ticket = await this.ticketRepository.approveTicket({
            id,
            isApproved
        }); 

        return ticket;
    }
}

module.exports = ApproveTicketUseCase;