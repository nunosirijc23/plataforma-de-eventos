const { v4: uuiV4 } = require('uuid');

const Ticket = require('./ticket');

describe("Ticket Entity", () => {
    it("should be able to create an ticket", () => {
        const ticket = new Ticket("Referência", uuiV4(), uuiV4());
        expect(ticket).not.toBeUndefined();
    });

    it("should be able to set values in ticket", () => {
        const ticket = new Ticket();
        const oldId = ticket.id;
        ticket.setValues(uuiV4(), "Multicaixa express", uuiV4(), uuiV4(), new Date());
        expect(ticket).not.toEqual(oldId);
    })
})