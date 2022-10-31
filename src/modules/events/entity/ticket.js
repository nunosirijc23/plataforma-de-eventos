const { v4: uuidV4 } = require('uuid');

class Ticket {
    constructor(payment, userId, eventId) {
        if (!this.id) {
            this.id = uuidV4();
        }
        this.payment = payment;
        this.userId = userId;
        this.eventId = eventId;
        this.createdAt = new Date();
    }

    setValues(id, payment, userId, eventId, createdAt) {
        this.id = id;
        this.payment = payment;
        this.userId = userId;
        this.eventId = eventId;
        this.createdAt = createdAt;
    }
}

module.exports = Ticket;