module.exports = {
    userMenus(request) {
        let menus = [
            {
                text: "Eventos",
                href: '/users/events',
                icon: 'calendar-alt',
                active: false
            },
            {
                text: "Meus Bilhetes",
                href: '/users/my-tickets',
                icon: 'ticket-alt',
                active: false
            }
        ]
        let url = request.url;

        if (url.includes('?')) {
            url = url.split('?')[0];
        }

        menus.map(menu => {
            if (menu.href == `/users${request.url}`) menu.active = true;
        })

        return menus;
    }, 
    producerMenus(request) {
        let menus = [
            {
                text: "Dashboard",
                href: '/producers/dashboard',
                icon: 'line-chart',
                active: false
            },
            {
                text: "Meus Eventos",
                href: '/producers/my-events',
                icon: 'calendar-alt',
                active: false
            }
        ]
        let url = request.url;

        if (url.includes('?')) {
            url = url.split('?')[0];
        }

        menus.map(menu => {
            if (menu.href == `/producers${request.url}`) menu.active = true;
        })

        return menus;
    }
}