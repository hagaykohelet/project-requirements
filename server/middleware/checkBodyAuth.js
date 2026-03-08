export function checkBodyAuth(req, res, next) {
    const user = req.body
    if (!user) {
        return res.status(400).json({ error: "missing body" })
    }
    const bodyKeys = Object.keys(user)
    if (!(bodyKeys.includes("password")) || !(bodyKeys.includes("agentCode"))) {
        return res.status(400).json({ error: "missing fields" })
    }
    if (typeof user.password !== "string" || typeof user.agentCode !== "string"){
        return res.status(400).json({error:"value type error"})
    }

    return next()
}