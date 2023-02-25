const ITicketRepository = require("../../../repositories/ITicketRepository");
const { connection } = require('../../../../../shared/infra/mysql/connection');


class TicketRepositoryMYSQL extends ITicketRepository {
    constructor () {
        super();
        this.repository = connection;
    }

    create() {}

    findAllByEventId(eventId) {
        return new Promise((resolve, reject) => {
            this.repository.query(`SELECT users.name, users.photo, users.phone, tickets.id, tickets.payment, tickets.isApproved, tickets.bankReceiptDirectory FROM tickets INNER JOIN users ON tickets.userId = users.id WHERE eventId=?`, [eventId], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    resolve(results);
                }
            });
        })
    }

    findAllByUserId(userId) {
        return new Promise((resolve, reject) => {
            this.repository.query(`SELECT events.id, events.name, events.photo, events.date, events.price, tickets.isApproved FROM tickets INNER JOIN events ON tickets.eventId = events.id WHERE userId=? ORDER BY events.date DESC`, [userId], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    resolve(results);
                }
            })
        })
    }
}

module.exports = TicketRepositoryMYSQL;
