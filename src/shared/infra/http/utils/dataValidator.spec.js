const { validateUserData } = require('./dataValidator');

describe("Data Validator", () => {
    it("Shoube be able validate user data", () => {
        const message = validateUserData("Nuno Miguel Mvemba", "nunosirijc@gmail.com", "945206434", "123443");

        expect(message).toEqual(false);
    })
})