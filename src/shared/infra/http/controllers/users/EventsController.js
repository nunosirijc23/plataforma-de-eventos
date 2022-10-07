class EvenstController {
    constructor () {}

    render(request, response) {
        return response.render('user/index', {
            title: 'Eventos',
            menus: request.menus,
            user: request.session.user
        })
    }
}

module.exports = EvenstController;