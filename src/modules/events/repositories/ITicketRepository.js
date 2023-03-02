class ITicketRepository {
    create(ticket) {}
    findAllByEventId(eventId) {}
    findAllByUserId(userId) {}
    findAllTicketsBoughtByEventId(eventId) {}
}

module.exports = ITicketRepository;