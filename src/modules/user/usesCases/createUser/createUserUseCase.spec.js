const UserRepositoryInMemory = require('../../repositories/in-memory/UserRepositoryInMemory');
const CreateUserUseCase = require('./createUserUseCase');

let createUserUseCase;
let userRepositoryInMemory;

describe("Create User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    })

    it("Should be able to create user", async () => {
        const user = await createUserUseCase.execute({
            name: "Nuno Miguel", 
            email: "nunosirijc23@gmail.com", 
            phone: 945206208,
            password: "12345" 
        });

        expect(user.id).not.toBeUndefined();
    })

    it("Should not be able to create a user with email that exists", async () => {
            await createUserUseCase.execute({
                name: "Nuno Miguel", 
                email: "nunosirijc23@gmail.com", 
                phone: 945206208,
                password: "12345" 
            });

            const user = await createUserUseCase.execute({
                name: "Pedro Miguel", 
                email: "nunosirijc23@gmail.com", 
                phone: 945206208,
                password: "12345" 
            });

            console.log(user);
    })
})