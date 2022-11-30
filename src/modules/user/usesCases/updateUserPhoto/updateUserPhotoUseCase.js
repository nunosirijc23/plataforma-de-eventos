const { deleteFile } = require("../../../../config/FileUpload");

class UpdateUserPhotoUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ photo, id }) {
        const user = await this.userRepository.findById(id);
        await deleteFile(user.photo);
        const userUpdated = await this.userRepository.updatePhoto({
            photo,
            id
        });
        return userUpdated;
    }

}

module.exports = UpdateUserPhotoUseCase;