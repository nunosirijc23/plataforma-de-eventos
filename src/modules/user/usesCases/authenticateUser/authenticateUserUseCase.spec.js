const AuthenticateUserUseCase = require('./authenticateUserUseCase');
const CreateUserUseCase = require('../createUser/createUserUseCase');
const UserRepositoryInMemory = require('../../repositories/in-memory/UserRepositoryInMemory');
const AppErrorException = require('../../../../config/AppErrorException');

let authenticateUserUseCase;
let createUserUseCase;
let userRepositoryInMemory;

describe("Authenticate User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    })

    it("should be able to authenticate user", async () => {
        await createUserUseCase.execute({ 
            name: "Nuno Miguel", 
            email: "nunosirijc23@gmail.com", 
            phone: 945206208, 
            password: "12345"
        });

        const user = await authenticateUserUseCase.execute({ 
            email: "nunosirijc23@gmail.com",
            password: "12345"
        })

        expect(user).not.toBeUndefined();
    });

    it("should not be able to authenticate user with wrong email", async () => {
        await createUserUseCase.execute({ 
            name: "Nuno Miguel", 
            email: "nunosirijc23@gmail.com", 
            phone: 945206208, 
            password: "12345"
        });

        let thrownError = null;

        try {
            await authenticateUserUseCase.execute({ 
                email: "nunosirijc@gmail.com",
                password: "12345"
            });
        } catch (error) {
            thrownError = error;    
        }

        expect(thrownError).toEqual(new AppErrorException("E-mail ou senha errada!"));
    });

    it("should not be able to authenticate user with wrong password", async () => {
        await createUserUseCase.execute({ 
            name: "Nuno Miguel", 
            email: "nunosirijc23@gmail.com", 
            phone: 945206208, 
            password: "12345"
        });

        let thrownError = null;

        try {
            await authenticateUserUseCase.execute({ 
                email: "nunosirijc23@gmail.com",
                password: "123456"
            });
        } catch (error) {
            thrownError = error;    
        }

        expect(thrownError).toEqual(new AppErrorException("E-mail ou senha errada!"));
    });
});