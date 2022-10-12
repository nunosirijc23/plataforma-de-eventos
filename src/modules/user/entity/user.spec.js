const { v4: uuidV4 } = require('uuid');

const User = require('./user');

describe("User Entity", () => {
    it("Should be able to create a new user", () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        expect(user.id).not.toBeUndefined();
    });

    it("Should be able to create a new user with photo default 'default.png'", () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        expect(user.photo).toBe('default.png');
    })

    it("Should be able to create a new user with createAt default date now()", () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        expect(user.createAt).not.toBeUndefined(); 
    })

    it("Should be able to set values", () => {
        const user = new User();
        const oldID = user.id
        user.setValues(uuidV4(), "Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "newPhoto.png", "sirijc23", new Date());
        expect(user.id).not.toEqual(oldID);
    })
})