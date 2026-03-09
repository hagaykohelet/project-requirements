import express, { json } from 'express';
import { checkBodyReports } from '../middleware/checkBodyReports.js';
import { verifyToken } from '../utils/token.js';
import { upload } from '../utils/handle_image.js';
import fs from 'fs/promises'

const reportRoute = express()

reportRoute.post('/', verifyToken, upload.single("image"), checkBodyReports, async (req, res) => {
    try {
        const payload = req.user
        const newObj = req.body
        const image = req.file

        if (!image) {
            return res.status(400).json({ error: "no image upload" })
        }
        console.log(image)
        const report = {
            id: 1, userid: payload.id,
            category: newObj.category, urgency: newObj.urgency,
            message: newObj.message, imagePath: image.buffer ,sourceType:image.mimetype, 
            createdAt: new Date().toLocaleString()
        }
        const response = await fs.readFile('./DB/reports.json')
        const data = await JSON.parse(response)
        data.push(report)
        await fs.writeFile('./DB/reports.json', JSON.stringify(data, null, 2))
        return res.status(201).json({ report: report })
    } catch (err) {
        return res.status(400).json({ error: String(err) })
    }
})





export default reportRoute