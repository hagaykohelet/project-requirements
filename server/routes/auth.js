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
            if (agent.agentCode === body.agentCode && verifyHashPassword(body.password, agent.hashPassword)) {
                const token = createToken(agent)
                return res.status(200).json({ token: token, user: agent.id, agentCode: agent.agentCode, fullName: agent.fullName, role: agent.role })
            }
        }
        return res.status(401).json({ error: "this user not exist" })
    }
    catch (err) {
        return res.status(500).send(String(err))
    }
})

authRoute.get('/me', (req, res)=>{
    try{
        const token = req.headers.token
        console.log(token)
        if(!token){
            return res.status(401).json({error:"this token not allowed!"})
        }
        const verifyUserToken = verifyToken(token)
        if(!verifyUserToken){
            return res.status(401).json({error:"this token not verified!"})
        }
        return res.status(200).json({user: verifyUserToken})
    }
    catch(err){
        return res.status(500).send(String(err))
    }
})




export default authRoute