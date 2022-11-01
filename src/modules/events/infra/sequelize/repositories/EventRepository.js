const IEventRepository = require("../../../repositories/IEventRepository");
const Event = require('../model/event');

class EventRepository extends IEventRepository {
    constructor() {
        super();
        this.repository = Event;
    }

    async create(event) {
        const eventSaved = await this.repository.create({
            id: event.id,
            name: event.name,
            date: event.date,
            startTime: event.startTime,
            endTime: event.endTime,
            price: event.price,
            photo: event.photo,
            capacity: event.capacity,
            province: event.province,
            county: event.county,
            district: event.district,
            street: event.street,
            description: event.description,
            categoryId: event.categoryId,
            producerId: event.producerId,
            createAt: event.createAt,
        });

        return await eventSaved.save();
    }

    async update(event) {
        const eventUpdated = await this.repository.update({
            name: event.name,
            date: event.date,
            startTime: event.startTime,
            endTime: event.endTime,
            price: event.price,
            capacity: event.capacity,
            province: event.province,
            county: event.county,
            district: event.district,
            street: event.street,
            description: event.description,
            categoryId: event.categoryId
        }, {
            where: { id: event.id },
        })

        return eventUpdated;
    }

    async findByNameAndCategoryIdAndProducerId({ name, categoryId, producerId }) {
        const event = await this.repository.findOne({ where: { name, categoryId, producerId }});
        return event;
    }

    async findAll({ name, categoryId }) {
        let events;

        if (name && categoryId) {
            events = await this.repository.findAll({ 
                where: { name, categoryId },
                include: ["category", "producer"]
            });
        } else if (name) {
            events = await this.repository.findAll({ 
                where: { name },
                include: ["category", "producer"]
            });
        } else if (categoryId) {
            events = await this.repository.findAll({ 
                where: { categoryId },
                include: ["category", "producer"]
            });
        } else {
            events = await this.repository.findAll({ include: ["category", "producer"]});
        }

        return events;
    }

    async findOneById(id) {
        const events = await this.repository.findOne({ 
            where: { id },
            include: "category"
        });
        return events;
    }

    async findAllByProducerId(producerId) {
        const events = await this.repository.findAll({ 
            where: { producerId },
            include: "category"
        });
        return events;
    }

    async updatePhoto({ photo, id }) {
        const event = await this.repository.update({
            photo,
        },{
            where: { id },
        });

        return event;
    }
}

module.exports = EventRepository;