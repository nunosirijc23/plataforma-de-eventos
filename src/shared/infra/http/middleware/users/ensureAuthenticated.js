function ensureAuthenticated(request, response, next) {
    let url = `/users${request.url}`;

    if (['/users/register', '/users/login'].indexOf(url) > -1 && !request.session.user) {
        next();
    } else if (['/users/register', '/users/login'].indexOf(url) > -1 && request.session.user) {
        return response.redirect('/users/events');
    } else if (['/users/events', '/users/my-tickets', '/users/buy-ticket'].indexOf(url) > -1 && !request.session.user) {
        return response.redirect('/users/login');
    } else {
        next();
    }
}

module.exports = ensureAuthenticated;