const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const fs = require('fs')

const AppErrorException = require('../config/AppErrorException')

// config upload path directory
const uploadPath = path.resolve(__dirname, '..', 'shared', 'infra', 'http', 'web', 'public', 'images');


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
    if (!(['events.png', 'default.png',].indexOf(filename) > -1)) {
        const filePath = path.join(uploadPath, filename)
        const isFileExist = await fs.promises.stat(filePath)
        if (isFileExist) await fs.promises.unlink(filePath)
    }
} // deleteFile

function verifyImage(file) {
    return new Promise((resolve, reject) => {
        if (['image/png', 'image/jpeg', 'image/jpg'].indexOf(file.mimetype) <= -1) {
            throw new AppErrorException('Formato da imagem não suportado!', true);
        }

        // if (file.size > 5242880) {
        //     reject('Só é permitido imagem de 5mb no máximo!')
        // }
        resolve(true)
    });
} // verifyImage

function verifyPDFFile(file) {
    return new Promise((resolve, reject) => {
        const extension = path.extname(file.originalname);
        
        if (extension !== '.pdf') {
            throw new AppErrorException('Formato do ficheiro não suportado!', true);
        }

        resolve(true);
    })
}

module.exports = { upload, deleteFile, verifyImage, verifyPDFFile, uploadPath }