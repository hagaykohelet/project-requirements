import express from 'express';
import { verifyToken } from '../utils/token.js';
import { validatePostRequesrt } from '../middleware/adminRouteValidation.js';
import fs from 'fs/promises';
import enAtbash from '../utils/atbash.js';

const adminRoute = express()
let id = 2
adminRoute.post('/users', verifyToken, validatePostRequesrt, async (req, res) => {
    try {
        const { role } = req.user
        const newUser = req.body
        // if (role !== "admin") {
        //     return res.status(403).json({ msg: "only admin can save new users" })
        // }
        newUser.id = id
        const { password } = newUser
        if (!password) {
            newUser.password = enAtbash(newUser.fullName)
        }
        const data = await JSON.parse(await fs.readFile('./DB/agents.json'))
        data.push(newUser)
        await fs.writeFile('./DB/agents.json',JSON.stringify(data, null, 2))
        id += 1
        return res.status(201).json({ user: newUser })
    } catch (err) {
        res.status(500), json({ error: String(err) })
    }
})







export default adminRoute