class DashboardBoard {
    constructor(findAllEventsByProducerIdUseCase) {
        this.findAllEventsByProducerIdUseCase = findAllEventsByProducerIdUseCase;
    }

    async render(request, response) {
        const events = await this.findAllEventsByProducerIdUseCase.execute(request.session.producer.id);
        const done = events.filter( event => new Date().getTime() > new Date(event.date).getTime());
        const pending = events.filter( event => new Date().getTime() < new Date(event.date).getTime());


        return response.render('producer/index', {
            title: 'Dashboard',
            menus: request.menus,
            producer: request.session.producer,
            eventsDashboard: {
                all: events.length,
                pending: pending.length,
                done: done.length
            },
            events
        })
    }
}

module.exports = DashboardBoard;