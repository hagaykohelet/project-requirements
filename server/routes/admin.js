import express from 'express';
import { verifyToken } from '../utils/token.js';
import { validatePostRequesrt } from '../middleware/adminRouteValidation.js';
import fs from 'fs/promises';
import enAtbash from '../utils/atbash.js';
import { createHashPassword } from '../utils/hash_password.js';

const adminRoute = express()
let id;

adminRoute.post('/users', verifyToken, validatePostRequesrt, async (req, res) => {
    try {
        const { role } = req.user
        const newUser = req.body
        if (role !== "admin") {
            return res.status(403).json({ msg: "only admin can save new users" })
        }
        const { password } = newUser
        const userForReturn = {...newUser}
        if (!password) {
            newUser.passwordHash = await createHashPassword(enAtbash(newUser.fullName))
        }
        else {
            newUser.passwordHash = await createHashPassword(newUser.password)
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
        id += 1
        return res.status(201).json({ user: userForReturn })
    } catch (err) {
        res.status(500).json({ error: String(err) })
    }
})

adminRoute.get('/users', verifyToken, async(req, res)=>{
    const user = req.user
    if(user.role !== "admin"){
        return res.status(403).json({error:"access denied"})
    }
    const users = await JSON.parse(await fs.readFile('./DB/agents.json'))
    return res.status(200).json({users:users})
})








export default adminRoute