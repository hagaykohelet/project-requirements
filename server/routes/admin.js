import express from 'express';
import { verifyToken } from '../utils/token.js';
import { validatePostRequesrt } from '../middleware/adminRouteValidation.js';
import fs from 'fs/promises';
import enAtbash from '../utils/atbash.js';
import { createHashPassword } from '../utils/hash_password.js';

const adminRoute = express()

adminRoute.post('/users', verifyToken, validatePostRequesrt, async (req, res) => {
    try {
        const { role } = req.user
        const newUser = req.body
        if (role !== "admin") {
            return res.status(403).json({ msg: "only admin can save new users" })
        }
        const { password } = newUser
        const userForReturn = { ...newUser }
        console.log(password)
        if (!password || password == null) {
            newUser.passwordHash = await createHashPassword(enAtbash(newUser.fullName))
            delete newUser.password
        }
        else {
            newUser.passwordHash = await createHashPassword(String(newUser.password))
            delete newUser.password
        }
        const data = await JSON.parse(await fs.readFile('./DB/agents.json'))
        let maxId = 0
        for (let agent of data) {
            if (agent.id > maxId) {
                maxId = agent.id
            }
        }
        newUser.id = maxId + 1
        userForReturn.id = newUser.id
        data.push(newUser)
        await fs.writeFile('./DB/agents.json', JSON.stringify(data, null, 2))
        return res.status(201).json({ user: userForReturn })
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: String(err) })
    }
})

adminRoute.get('/users', verifyToken, async (req, res) => {
    try {
        const user = req.user
        if (user.role !== "admin") {
            return res.status(403).json({ error: "access denied" })
        }
        const users = await JSON.parse(await fs.readFile('./DB/agents.json'))
        return res.status(200).json({ users: users })
    }catch(err){
        return res.status(400).json({error:String(err)})
    }
})








export default adminRoute