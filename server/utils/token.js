import jwt from 'jsonwebtoken';
import 'dotenv/config'

const secretKey = process.env.SECRET_KEY_TOKEN

export function createToken(obj) {
    return jwt.sign({ role: obj.role, fullName:obj.fullName, id:obj.id , agentCode:obj.agentCode}, secretKey, { expiresIn: '1h' })
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey)
    }catch(err){
        console.log(err)
    }
}