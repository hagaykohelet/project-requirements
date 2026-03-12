import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.js';
import reportRoute from './routes/reports.js';
import adminRoute from './routes/admin.js';

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use('/images',express.static('images'))
app.use("/auth", authRoute)
app.use('/reports', reportRoute)
app.use('/admin', adminRoute)

app.listen(PORT, () => {
    console.log("server running...")
})