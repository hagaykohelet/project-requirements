export function checkBodyReports(req, res, next) {
    const body = req.body;
    const bodyKeys = Object.keys(body)
    const allowKeys = ["message", "category", "urgency", "imagePath"]
    const categoryKeys = ["intelligence", "logistics", "alert"]
    const urgencyKeys = ["low", "medium", "high"]
    if (!body) {
        return res.status(400).json({ error: "please enter body" })
    }
    if (bodyKeys.length < 3) {
        return res.status(400).json({ keyError: "missing keys!" })
    }
    for (let key of bodyKeys) {
        if (!(allowKeys.includes(key))) {
            return res.status(400).json({ keyError: "this key not allowed!" })
        }
    }
    if ((typeof body.message || typeof body.category || typeof body.urgency) !== "string") {
        return res.status(400).json({ typeError: "this type not allowed!" })
    }
    if (!(categoryKeys.includes(body.category))) {
        return res.status(400).json({ error: "this category not allowed" })
    }
    if (!(urgencyKeys.includes(body.urgency))) {
        return res.status(400).json({ error: "this category not allowed" })
    }
    return next()
}

