class EventController {
    constructor(findOneEventByIdUseCase, findAllTicketsByEventIdUseCase, findAllTicketsBoughtByEventIdUseCase) {
        this.findOneEventByIdUseCase = findOneEventByIdUseCase;
        this.findAllTicketsByEventIdUseCase = findAllTicketsByEventIdUseCase;
        this.findAllTicketsBoughtByEventIdUseCase = findAllTicketsBoughtByEventIdUseCase;
    }

    async render(request, response) {
        const { id } = request.params;

        const event = await this.findOneEventByIdUseCase.execute(id);
        const tickets = await this.findAllTicketsByEventIdUseCase.execute(id);
        const ticketsBought = await this.findAllTicketsBoughtByEventIdUseCase.execute(id);
        return response.render('producer/event', {
            title: 'Evento',
            producer: request.session.producer,
            event,
            tickets,
            totalTickets: ticketsBought.length
        });
    }
}

module.exports = EventController;