import jwt from 'jsonwebtoken';
import 'dotenv/config'

const secretKey = process.env.SECRET_KEY_TOKEN

export function createToken(obj) {
    return jwt.sign(obj, secretKey, { expiresIn: '24h' })
}

export function verifyToken(req, res, next) {
    const token = req.headers.token
    console.log(token)
    if (token === null) {
        return res.status(401).json({ error: "you need token" })
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).json({ err })
        }
        req.user = user
        next()
    })
}


