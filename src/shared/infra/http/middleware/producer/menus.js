const menusSidebar = require('../../utils/menuSidebar');

function menus(request, response, next) {
    request.menus = menusSidebar.producerMenus(request);
    next();
}

module.exports = menus;