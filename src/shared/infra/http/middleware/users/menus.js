const menusSidebar = require('../../utils/menuSidebar');

function menus(request, response, next) {
    request.menus = menusSidebar.userMenus(request);
    next();
}

module.exports = menus;