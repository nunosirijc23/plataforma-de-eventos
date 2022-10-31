class EvenstController {
    constructor (findAllEventsUseCase, findAllCategories) {
        this.findAllEventsUseCase = findAllEventsUseCase;
        this.findAllCategories = findAllCategories;
    }

    async render(request, response) {
        const { name, categoryId } = request.query;

        const events = await this.findAllEventsUseCase.execute({ name, categoryId });
        const categories = await this.findAllCategories.execute();

        return response.render('user/index', {
            title: 'Eventos',
            search: true,
            menus: request.menus,
            user: request.session.user,
            events,
            categories
        });
    }
}

module.exports = EvenstController;