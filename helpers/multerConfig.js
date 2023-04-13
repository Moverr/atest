const multer = require('multer');
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/candidates/'))
    },
    filename: (req, file, cb) => {
        const preffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, preffix + '-' + file.originalname)
    }
})
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    storage: storage,
    fileFilter: (req, file, cb) => {
        var ext = path.extname(file.originalname)
        if (ext != ".png" && ext != ".jpg" && ext != ".jpeg") {
            return cb(null, false)
        }
        cb(null, true)
    }
})

module.exports = upload