export function validatePostRequesrt(req, res, next) {
    const newUser = req.body
    const allowKeys = ["agentCode", "fullName", "role"]
    const newUserKeys = Object.keys(newUser)
    if (!newUser) {
        return res.status(400).json({ error: "please enter some agent" })
    }
    if (newUserKeys.length < 3) {
        return res.status(400).json({ error: "missing keys" })
    }
    for (let key of allowKeys) {
        if (!(newUserKeys.includes(key))) {
            return res.status(400).json({ error: 'keys not allowed' })
        }
    }
    if ((typeof newUser.agentCode || typeof newUser.fullName) !== "string") {
        return res.status(400).json({ error: "type error" })
    }
    if (newUser.role !== "admin" && newUser.role !== "agent") {
        return res.status(400).json({ error: "role type error" })
    }
    next()
}