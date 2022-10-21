const User = require('../../entity/user');
const UserRepositoryInMemory = require('./UserRepositoryInMemory');

describe("User repository in memory", () => {
    it("should be able to save a new user in memory", async () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        const userRepositoryInMemory = new UserRepositoryInMemory();
        const userSaved = await userRepositoryInMemory.create(user);
        expect(userSaved).toEqual(user);
    })

    it("should be able to find user by email in memory", async () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        const userRepositoryInMemory = new UserRepositoryInMemory();
        await userRepositoryInMemory.create(user);
        const userFetched = await userRepositoryInMemory.findByEmail("nunosirijc23@gmail.com");
        expect(userFetched).toEqual(user);
    })

    it("should be able to find user by phone in memory", async () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        const userRepositoryInMemory = new UserRepositoryInMemory();
        await userRepositoryInMemory.create(user);
        const userFetched = await userRepositoryInMemory.findByPhone(945206208);
        expect(userFetched).toEqual(user);
    })
})