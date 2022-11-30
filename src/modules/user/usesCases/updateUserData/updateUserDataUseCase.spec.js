const UserRepositoryInMemory = require('../../repositories/in-memory/UserRepositoryInMemory');
const CreateUserUseCase = require('../createUser/createUserUseCase');
const UpdateUserDataUseCase = require('./updateUserDataUseCase');

let createUserUseCase;
let updateUserDataUseCase;
let userRepositoryInMemory;

describe("Update User Use Case", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
        updateUserDataUseCase = new UpdateUserDataUseCase(userRepositoryInMemory);
    })

    it("Should be able to update user data", async () => {
        const user = await createUserUseCase.execute({
            name: "Nuno Miguel", 
            email: "nunosirijc23@gmail.com", 
            phone: 945206208,
            password: "12345" 
        });

        const userFetched = await updateUserDataUseCase.execute({
            name: "John Noe",
            email: "johnnoe@gmail.com",
            phone: 945298392,
            id: user.id
        });

        expect(userFetched.id).toEqual(user.id);
    })

})