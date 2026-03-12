import React, { useState, type ChangeEvent } from "react"

function NewReport() {

    const token = localStorage.getItem("token")

    const [category, setCategory] = useState<string>("")
    const [urgency, setUrgency] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [image, setImage] = useState<File | string>("")
    const [alert, setAlert] = useState<string>("")

    const form = new FormData()
    async function postData() {
        form.append("message", message)
        form.append("urgency", urgency)
        form.append("image", image)
        form.append("category", category)
        try {
            const res = await fetch("http://localhost:3000/reports", {
                method: "POST",
                headers: { token: String(token) },
                body: form
            })
            const data = await res.json()
            if (!res.ok) {
                setAlert("failed")
            }
            else {
                setAlert("success")
            }
        }
        catch (err) {
            setAlert("failed to fetch")
            console.log(err)
        }
    }


    return (
        <div className="new-report-page">
            <select name="category"
                onChange={(e) => { setCategory(e.target.value) }} >
                <option disabled selected hidden>choose category</option>
                <option value="intelligence">intelligence</option>
                <option value="logistics">logistics</option>
                <option value="alert">alert</option>
            </select>
            <select name="urgency"
                onChange={(e) => { setUrgency(e.target.value) }} >
                <option disabled selected hidden>choose urgency</option>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>
            <textarea name="message" onChange={(e) => { setMessage(e.target.value) }} placeholder="enter your message"></textarea>
            <input type="file" name="image" className="image" onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => { if (e.target.files !== null && e.target.files[0] !== null) { setImage(e.target.files[0]) } }} />
            <button onClick={postData}>send report</button>
            <p>{alert}</p>

        </div>
    )
}

export default NewReport
