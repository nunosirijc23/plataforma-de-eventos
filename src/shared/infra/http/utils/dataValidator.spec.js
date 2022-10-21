const { v4: uuidv4 } = require('uuid');

const { validateUserData, validateEventData } = require('./dataValidator');

describe("Data Validator", () => {
    it("Should be able validate user data", () => {
        const message = validateUserData("Nuno Miguel Mvemba", "nunosirijc@gmail.com", "945206434", "123443");

        expect(message).toEqual(false);
    })

    it("should be able to validate event data", () => {
        const message = validateEventData('Festa', '01-12-2022', 100023, 123211, 0, 200, "province", "county", "district", "street", uuidv4(), uuidv4())

        expect(message).toEqual(false);
    })
})