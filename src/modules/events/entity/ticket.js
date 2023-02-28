const { v4: uuidV4 } = require('uuid');

class Ticket {
    constructor(payment, userId, eventId, bankReceiptDirectory, isApproved) {
        if (!this.id) {
            this.id = uuidV4();
        }
        this.payment = payment;
        this.userId = userId;
        this.eventId = eventId;
        this.bankReceiptDirectory = bankReceiptDirectory;
        this.isApproved = isApproved;
        this.createdAt = new Date();
    }

    setValues(id, payment, userId, eventId, bankReceiptDirectory, isApproved, createdAt) {
        this.id = id;
        this.payment = payment;
        this.userId = userId;
        this.eventId = eventId;
        this.bankReceiptDirectory = bankReceiptDirectory;
        this.isApproved = isApproved;
        this.createdAt = createdAt;
    }
}

module.exports = Ticket;