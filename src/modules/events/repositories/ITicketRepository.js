class ITicketRepository {
    create(ticket) {}
    findAllByEventId(eventId) {}
    findAllByUserId(userId) {}
    findAllTicketsBoughtByEventId(eventId) {}
    approveTicket({ id, isApproved }) {}
}

module.exports = ITicketRepository;