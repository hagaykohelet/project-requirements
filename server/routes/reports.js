import express from 'express';
import { checkBodyReports } from '../middleware/checkBodyReports.js';
import { verifyToken } from '../utils/token.js';
import { upload } from '../utils/handle_image.js';
import fs from 'fs/promises'
import { readCSV, uploadFile } from '../utils/handle_csv.js';

let id = 0
const reportRoute = express()


reportRoute.post('/', verifyToken, upload.single("image"), checkBodyReports, async (req, res) => {
    try {
        id += 1
        const payload = req.user
        const newObj = req.body
        const image = req.file

        if (!image) {
            return res.status(400).json({ error: "no image upload" })
        }
        const report = {
            id: id, userid: payload.id,
            category: newObj.category, urgency: newObj.urgency,
            message: newObj.message, imagePath: image.path, sourceType: image.mimetype,
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

reportRoute.post('/csv', verifyToken, uploadFile.single("file"), async (req, res) => {
    try {
        const file = req.file
        if (!file) {
            return res.status(400).json({ error: 'you need upload a file' })
        }
        const data = await readCSV(file.buffer)
        
        return res.status(201).json({importedCount:[data.length],reports:data})
    }
    catch (err) {
        return res.status(500).json({ error: String(err) })
    }
})



export default reportRoute