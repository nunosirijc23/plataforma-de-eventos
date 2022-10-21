const { convertHoursToMinutes } = require('./time');

describe("Time", () => {
    it("should be able to convert hours in time", () => {
        const miliseconds = convertHoursToMinutes("20:30");
        expect(miliseconds).not.toBeUndefined();
    })
})