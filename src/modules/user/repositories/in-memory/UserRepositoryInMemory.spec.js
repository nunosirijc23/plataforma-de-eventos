const User = require('../../entity/user');
const UserRepositoryInMemory = require('./UserRepositoryInMemory');

describe("User repository in memory", () => {
    it("should be able to create user", async () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        const userRepositoryInMemory = new UserRepositoryInMemory();
        const userSaved = await userRepositoryInMemory.create(user);
        expect(userSaved.id).toEqual(user.id);
    })

    it("shoulb be able to find user by email", async () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        const userRepositoryInMemory = new UserRepositoryInMemory();
        await userRepositoryInMemory.create(user);
        const userFetched = await userRepositoryInMemory.findByEmail("nunosirijc23@gmail.com");
        expect(userFetched.id).toEqual(user.id);
    })
})