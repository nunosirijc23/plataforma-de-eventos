const User = require('./user');

describe("Create User", () => {
    it("Should be able to create a new user", () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        expect(user.id).not.toBeUndefined();
    });

    it("Should be able to create a new user with photo default 'default.png'", () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        expect(user.photo).toBe('default.png');
    })

    it("Should be able to create a new user with create_at default date now()", () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        expect(user.create_at).not.toBeUndefined(); 
    })
})