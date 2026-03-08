import express from 'express';
import { checkBodyReports } from '../middleware/checkBodyReports.js';
import { verifyToken } from '../utils/token.js';


const reportRoute = express()

reportRoute.post('/', verifyToken, checkBodyReports, (req, res) => {
    try {
        const payload = req.user
        const newObj = req.body
        return res.status(201).json({ report: { id: 1, userid:payload.id, 
            category: newObj.category, urgency:newObj.urgency,
            message:newObj.message, imagePath:newObj.imagePath, 
            createdAt: new Date().toLocaleString()
        } })
    } catch (err) {
        return res.status(400).json({ error: String(err) })
    }
})





export default reportRoute