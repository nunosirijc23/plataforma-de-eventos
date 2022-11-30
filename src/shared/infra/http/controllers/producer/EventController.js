class EventController {
    constructor(findOneEventByIdUseCase, findAllTicketsByEventIdUseCase) {
        this.findOneEventByIdUseCase = findOneEventByIdUseCase;
        this.findAllTicketsByEventIdUseCase = findAllTicketsByEventIdUseCase;
    }

    async render(request, response) {
        const { id } = request.params;

        const event = await this.findOneEventByIdUseCase.execute(id);
        const tickets = await this.findAllTicketsByEventIdUseCase.execute(id);

        return response.render('producer/event', {
            title: 'Evento',
            producer: request.session.producer,
            event,
            tickets,
            totalTickets: tickets.length
        });
    }
}

module.exports = EventController;