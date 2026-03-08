import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.js';
import reportRoute from './routes/reports.js';
import { upload } from './utils/handle_image.js';

const app = express()
const PORT = 3000


app.use(express.json())
app.use(cors())
app.use("/auth", authRoute)
app.use('/reports', reportRoute)
// app.post('/image', upload.single("image"), (req, res, next) => {
//     const image = req.file
//     if (!image) {
//         return res.status(400).json({ error: "no image upload" })
//     }
//     console.log(image)
// })

app.listen(PORT, () => {
    console.log("server running...")
})