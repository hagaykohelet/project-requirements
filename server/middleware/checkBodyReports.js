export function checkBodyReports(req, res, next) {
    const newObj = req.body;
    console.log(newObj)
    const newObjKeys = Object.keys(newObj)
    const allowKeys = ["message", "category", "urgency"]
    const categoryKeys = ["intelligence", "logistics", "alert"]
    const urgencyKeys = ["low", "medium", "high"]
    if (!newObj) {
        return res.status(400).json({ error: "please enter body" })
    }
    if (newObjKeys.length < 3) {
        return res.status(400).json({ keyError: "missing keys!" })
    }
    for (let key of newObjKeys) {
        if (!(allowKeys.includes(key))) {
            return res.status(400).json({ keyError: "this key not allowed!" })
        }
    }
    if ((typeof newObj.message || typeof newObj.category || typeof newObj.urgency) !== "string") {
        return res.status(400).json({ typeError: "this type not allowed!" })
    }
    if (!(categoryKeys.includes(newObj.category))) {
        return res.status(400).json({ error: "this category not allowed" })
    }
    if (!(urgencyKeys.includes(newObj.urgency))) {
        return res.status(400).json({ error: "this category not allowed" })
    }
    return next()
}

