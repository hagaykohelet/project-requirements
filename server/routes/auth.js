import express from 'express';
import fs from 'fs/promises';
import { checkBodyAuth } from '../middleware/checkBodyAuth.js';
import { createToken, verifyToken } from '../utils/token.js';
import { verifyHashPassword } from '../utils/hash_password.js';

const authRoute = express();

authRoute.post('/login', checkBodyAuth, async (req, res) => {
    try {
        const body = req.body;
        const response = await fs.readFile('./DB/agents.json')
        const data = await JSON.parse(response)
        for (let agent of data) {

            if (agent.agentCode === body.agentCode && await verifyHashPassword(body.password, agent.passwordHash)) {
                const token = createToken(agent)
                return res.status(200).json({ token: token, user: agent.id, agentCode: agent.agentCode, fullName: agent.fullName, role: agent.role })
            }
        }
        return res.status(401).json({ error: "this user not exist" })
    }
    catch (err) {
        return res.status(400).send(String(err))
    }
})

authRoute.get('/me', verifyToken, (req, res) => {
    try {
        const user = req.user
        return res.status(200).json({ user: user })
    }
    catch (err) {
        return res.status(400).send(String(err))
    }
})




export default authRoute