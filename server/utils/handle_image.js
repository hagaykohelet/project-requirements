import multer from 'multer'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
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
export { upload, filefilter }