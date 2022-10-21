const AppMessage = require("../../../../../config/AppMessage");
const { validateEventData } = require("../../utils/dataValidator");
const { convertHoursToMinutes } = require("../../utils/time");

class MyEventsController {
    constructor(findAllEventsByProducerIdUseCase, findAllCategoriesUseCase, createEventUseCase) {
        this.findAllEventsByProducerIdUseCase = findAllEventsByProducerIdUseCase;
        this.findAllCategoriesUseCase = findAllCategoriesUseCase;
        this.createEventUseCase = createEventUseCase;
    }

    async render(request, response) {
        const events = await this.findAllEventsByProducerIdUseCase.execute(request.session.producer.id);
        const categories = await this.findAllCategoriesUseCase.execute();

        return response.render('producer/my-events', {
            title: 'Meus eventos',
            menus: request.menus,
            producer: request.session.producer,
            categories,
            events
        })
    }

    async handler(request, response) {
        const { name, date, startTime, endTime, price, capacity, province, county, district, street, description, categoryId, producerId} = request.body;

        let startTimeConverted = convertHoursToMinutes(startTime);
        let endTimeConverted = convertHoursToMinutes(endTime);
        const message = validateEventData(name, date, startTimeConverted, endTimeConverted, price, capacity, province, county, district, street, categoryId, producerId);
        let eventDate = new Date(date);
        let dateNow = new Date();

        if (price < 0) return new AppMessage("Preço não deve ser um valor negátivo!", true);
        if (message) return new AppMessage(message, true);
        if (eventDate.getTime() <= dateNow.getTime()) return new AppMessage("Impossivel criar um evento no mesmo dia ou data passada!", true);

        try {
            await this.createEventUseCase.execute({
                name,
                date,
                startTime,
                endTime, 
                price,
                capacity,
                province,
                county,
                district,
                street,
                description,
                categoryId,
                producerId
            })
        } catch (error) {
            if (!error.isKnownError) return new AppMessage("Ocorreu um problema no servidor, tente mais tarde...", true);
            return new AppMessage(error.message, true);
        }

        return new AppMessage("Evento criado com sucesso!", false);
    }
}

module.exports = MyEventsController;