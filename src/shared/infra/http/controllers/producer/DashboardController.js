class DashboardBoard {
    constructor() {}

    render(request, response) {
        return response.render('producer/index', {
            title: 'Dashboard',
            menus: request.menus,
            producer: request.session.producer
        })
    }
}

module.exports = DashboardBoard;