import express from 'express';
import fs from 'fs/promises';
import { checkBodyReports } from '../middleware/checkBodyReports.js';
import { readCSV, uploadFile } from '../utils/handle_csv.js';
import { upload } from '../utils/handle_image.js';
import { verifyToken } from '../utils/token.js';

const reportRoute = express()


reportRoute.post('/', verifyToken, upload.single("image"), checkBodyReports, async (req, res) => {
    try {
        const payload = req.user
        const newObj = req.body
        const image = req.file

        if (!image) {
            return res.status(400).json({ error: "no image upload" })
        }
        const response = await fs.readFile('./DB/reports.json')
        const data = await JSON.parse(response)
        let maxId = 0
        for (let r of data) {
            if (r.id >= maxId) {
                maxId = r.id + 1
            }
        }
        const report = {
            id: maxId, userid: payload.id,
            category: newObj.category, urgency: newObj.urgency,
            message: newObj.message, imagePath: image.path, sourceType: image.mimetype,
            createdAt: new Date().toLocaleString()
        }

        data.push(report)
        await fs.writeFile('./DB/reports.json', JSON.stringify(data, null, 2))
        return res.status(201).json({ report: report })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: String(err) })
    }
})

reportRoute.post('/csv', verifyToken, uploadFile.single("file"), async (req, res) => {
    try {
        const file = req.file
        const payload = req.user
        if (!file) {
            return res.status(400).json({ error: 'you need upload a file' })
        }
        const newData = await readCSV(file.buffer)
        const dataKeys = Object.values(newData[0])
        if (dataKeys.includes("") || !(dataKeys.includes("message")) || !(dataKeys.includes("urgency")) || !(dataKeys.includes("message"))) {
            return res.status(400).json({ error: "this csv not include all keys" })
        }
        const reports = await JSON.parse(await fs.readFile('./DB/reports.json'))
        let maxId = 0
        for (let r of reports) {
            if (r.id >= maxId) {
                maxId = r.id + 1
            }
        }
        const allNewReports = []
        newData.splice(0, 1)
        for (let data of newData) {
            const newReport = {
                id: maxId, userid: payload.id,
                category: data.category, urgency: data.urgency,
                message: data.message, imagePath: null, sourceType: file.mimetype,
                createdAt: new Date().toLocaleString()
            }
            maxId += 1
            allNewReports.push(newReport)
        }
        reports.push(...allNewReports)
        await fs.writeFile('./DB/reports.json', JSON.stringify(reports, null, 2))
        return res.status(201).json({ importedCount: [newData.length], reports: allNewReports })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ error: String(err) })
    }
})


reportRoute.get('/report', verifyToken, async (req, res) => {
    try {
        const user = req.user
        const filterQuery = req.query
        const reports = await JSON.parse(await fs.readFile('./DB/reports.json'))
        let filteredReport;

        if (user.role === "admin") {
            if (Object.keys(filterQuery).length >= 1) {
                filteredReport = reports.filter((item) => { if (item.userid === Number(filterQuery.id) || item.category.toLowerCase() === filterQuery.category || item.urgency.toLowerCase() === filterQuery.urgency) return item })
            }
            else {
                filteredReport = reports
            }
        }
        else {
            if (Object.keys(filterQuery).length >= 1) {
                filteredReport = reports.filter((item) => { if (item.userid == user.id && (item.category.toLowerCase() === filterQuery.category || item.urgency.toLowerCase() === filterQuery.urgency)) {
                    console.log(item)
                } })
            }
            else {
                console.log("here")
                filteredReport = reports.filter((item) => {if(item.userid == user.id)return item})
            }
        }
        console.log(filteredReport)
        return res.status(200).json({ reports: filteredReport })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: String(err) })
    }
})

reportRoute.get('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params
        const user = req.user
        console.log(user)
        const allReports = await JSON.parse(await fs.readFile('./DB/reports.json'))
        const report = allReports.filter((item) => item.id == id)
        if (user.role === "agent" && report.userid !== user.id) {
            return res.status(403).json({ message: "access denied" })
        }
        if (report.length === 0) {
            return res.status(404).json({ error: "this report not exist" })
        }
        return res.status(200).json({ report: report })
    } catch (err) {
        return res.status(400).json({ error: String(err) })
    }
})

export default reportRoute


