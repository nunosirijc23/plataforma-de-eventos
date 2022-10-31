class EventController {
    constructor(findOneEventByIdUseCase) {
        this.findOneEventByIdUseCase = findOneEventByIdUseCase;
    }

    async render(request, response) {
        const { id } = request.params;

        const event = await this.findOneEventByIdUseCase.execute(id);

        return response.render('producer/event', {
            title: 'Evento',
            producer: request.session.producer,
            event
        })
    }
}

module.exports = EventController;