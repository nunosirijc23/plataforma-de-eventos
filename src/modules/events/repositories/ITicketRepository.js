class ITicketRepository {
    create(ticket) {}
    findAllByEventId(eventId) {}
    findAllByUserId(userId) {}
    findAllTicketsBoughtByEventId(eventId) {}
    approveTicket({ id, isApproved }) {}
    findOneTicketById(id) {}
}

module.exports = ITicketRepository;