const User = require('../../entity/user');
const UserRepositoryInMemory = require('./UserRepositoryInMemory');

describe("User repository in memory", () => {
    it("should be able to save a new user in memory", async () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        const userRepositoryInMemory = new UserRepositoryInMemory();
        const userSaved = await userRepositoryInMemory.create(user);
        expect(userSaved).toEqual(user);
    })

    
    it("should be able to find user by id in memory", async () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        const userRepositoryInMemory = new UserRepositoryInMemory();
        await userRepositoryInMemory.create(user);
        const userFetched = await userRepositoryInMemory.findById(user.id);
        expect(userFetched).toEqual(user);
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

    
    it("should be able to update photo in memory", async () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        const userRepositoryInMemory = new UserRepositoryInMemory();
        await userRepositoryInMemory.create(user);
        const oldPhoto = user.photo;
        const userFetched = await userRepositoryInMemory.updatePhoto({
            photo: "newPhoto.png",
            id: user.id
        });
        expect(userFetched.photo).not.toEqual(oldPhoto);
    })

    it("should be able to update user data in memory", async () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        const userRepositoryInMemory = new UserRepositoryInMemory();
        await userRepositoryInMemory.create(user);
        const userToUpdate = new User();
        userToUpdate.id = user.id;
        userToUpdate.name = "John Noe";
        userToUpdate.email = "johnnoe.spread.com";
        userToUpdate.phone = 944342112;
        const userFetched = await userRepositoryInMemory.updateUserData(userToUpdate);
        expect(userFetched.id).toEqual(user.id);
    })

    it("should be able to change user password in memory", async () => {
        const user = new User("Nuno Miguel", "nunosirijc23@gmail.com", 945206208, "sirijc23");
        const userRepositoryInMemory = new UserRepositoryInMemory();
        await userRepositoryInMemory.create(user);
        const oldPassword = user.password;
        const userFetched = await userRepositoryInMemory.updatePassword({
            password: 'newPassword',
            id: user.id
        });
        expect(userFetched.password).not.toEqual(oldPassword);
    })
})