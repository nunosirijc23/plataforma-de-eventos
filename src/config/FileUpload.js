const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const fs = require('fs')

// config upload path directory
const uploadPath = path.resolve(__dirname, '..', '..', '..', 'uploads')


const storage = multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, callback) => {
        const generatedHash = crypto.randomBytes(10).toString('hex')
        const filename = `${generatedHash}-${file.originalname}`
        return callback(null, filename)
    }
}) // multer file config

const upload = multer({ storage })

async function deleteFile(filename) {
    if (!(['company.png', 'dish.png', 'service.png', 'room.png'].indexOf(filename) > -1)) {
        const filePath = path.join(uploadPath, filename)
        const isFileExist = await fs.promises.stat(filePath)
        if (isFileExist) await fs.promises.unlink(filePath)
    }
} // deleteFile

function verifyImage(file) {
    return new Promise((resolve, reject) => {
        if (['image/png', 'image/jpeg'].indexOf(file.mimetype) <= -1) {
            deleteFile(file.filename)
            reject('Formato da imagem não suportado!')
        }

        if (file.size > 5242880) {
            deleteFile(file.filename)
            reject('Só é permitido imagem de 5mb no máximo!')
        }
        resolve(true)
    })
} // verifyImage

module.exports = { upload, deleteFile, verifyImage, uploadPath }