import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.js';
import reportRoute from './routes/reports.js';

const app = express()
const PORT = 3000


app.use(express.json())
app.use(cors())
app.use("/auth", authRoute)
app.use('/reports', reportRoute)


app.listen(PORT, () => {
    console.log("server running...")
})