function ensureAuthenticated(request, response, next) {
    let url = `/producers${request.url}`;

    if (['/producers/register', '/producers/login'].indexOf(url) > -1 && !request.session.producer) {
        next();
    } else if (['/producers/register', '/producers/login'].indexOf(url) > -1 && request.session.producer) {
        return response.redirect('/producers/dashboard');
    } else if (['/producers/dashboard', '/producers/my-events', '/producers/event'].indexOf(url) > -1 && !request.session.producer) {
        return response.redirect('/producers/login');
    } else {
        next();
    }
}

module.exports = ensureAuthenticated;