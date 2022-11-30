const UserRepositoryInMemory = require('../../repositories/in-memory/UserRepositoryInMemory');
const CreateUserUseCase = require('../createUser/createUserUseCase');
const UpdateUserPhotoUseCase = require('./updateUserPhotoUseCase');

let createUserUseCase;
let updateUserPhotoUseCase;
let userRepositoryInMemory;

describe("Update User Photo Use Case", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
        updateUserPhotoUseCase = new UpdateUserPhotoUseCase(userRepositoryInMemory);
    })

    it("Should be able to create user", async () => {
        const user = await createUserUseCase.execute({
            name: "Nuno Miguel", 
            email: "nunosirijc23@gmail.com", 
            phone: 945206208,
            password: "12345" 
        });

        const oldPhoto = user.photo;
        const userUpdated = await updateUserPhotoUseCase.execute({
            photo: "newPhoto.png",
            id: user.id
        });

        expect(userUpdated.photo).not.toEqual(oldPhoto);
    })
})