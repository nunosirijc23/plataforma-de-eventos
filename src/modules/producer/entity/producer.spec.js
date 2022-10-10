const { v4: uuidV4 } = require('uuid');

const Producer = require('./producer');

describe("Create Producer", () => {
    it("should be able to create producer", () => {
        const producer = new Producer("Pro Eventos", "pro.events@gmail.com", "112454");
        expect(producer.id).not.toBeUndefined()
    })

    it("should be able to create producer with createAt default date now()", () => {
        const producer = new Producer("Pro Eventos", "pro.events@gmail.com", "112454");
        expect(producer.createAt).not.toBeUndefined()
    })

    it("should be able to set values in producer", () => {
        const producer = new Producer();
        const oldId = producer.id;
        producer.setValues(uuidV4(), "Pro Events", "pro.events@gmail.com", "123456", new Date());
        expect(producer.id).not.toEqual(oldId);
    })
})