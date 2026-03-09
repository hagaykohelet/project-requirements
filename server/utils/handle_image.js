import multer from 'multer'
const storage = multer.memoryStorage()
const filefilter = (req, file, cb) => {
    const allowExtensions = ["image/png", "image/jpg", "image/jpeg"];
    if (allowExtensions.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }

}

const upload = multer({ storage, filefilter })
export {upload}