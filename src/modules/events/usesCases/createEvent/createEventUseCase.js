const Event = require('../../entity/event');
const AppErrorException = require('../../../../config/AppErrorException');

class CreateEventUseCase {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }

    async execute({ 
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
        producerId,
    }) {
        const eventExists = await this.eventRepository.findByNameAndCategoryIdAndProducerId({
            name,
            categoryId,
            producerId
        });

        if (eventExists) throw new AppErrorException("Já existe um evento com este nome!");

        const event = new Event(name, date, startTime, endTime, price, capacity, province, county, district, street, description, categoryId, producerId);
        const eventSaved = await this.eventRepository.create(event);
        return eventSaved;
    }
}

module.exports = CreateEventUseCase;