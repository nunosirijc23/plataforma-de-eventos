const UserRepositoryInMemory = require('../../repositories/in-memory/UserRepositoryInMemory');
const CreateUserUseCase = require('../createUser/createUserUseCase');
const ChangeUserPasswordUseCase = require('./changeUserPasswordUseCase');

let createUserUseCase;
let userRepositoryInMemory;
let changeUserPasswordUseCase;

describe("Change User Password Use Case", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
        changeUserPasswordUseCase = new ChangeUserPasswordUseCase(userRepositoryInMemory);
    })

    it("Should be able to change user password", async () => {
        const user = await createUserUseCase.execute({
            name: "Nuno Miguel", 
            email: "nunosirijc23@gmail.com", 
            phone: 945206208,
            password: "12345" 
        });

        const oldPassword = user.password;

        const userFetched = await changeUserPasswordUseCase.execute({
            password: "newPassword",
            id: user.id
        });

        expect(userFetched.password).not.toEqual(oldPassword);
    })
})