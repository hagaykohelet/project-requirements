import { useState } from "react"

function NewReport() {
    const token = localStorage.getItem("token")
    const [category, setCategory] = useState<string>()
    const [urgency, setUrgency] = useState<string>()
    const [message, setMessage] = useState<string>()
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
                <option disabled selected hidden>choose category</option>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>
            <textarea name="message" onChange={(e)=>{setMessage(e.target.value)}} placeholder="enter your message"></textarea>
            <input type="file" name="image"/>
            <button>send report</button>
        </div>
    )
}

export default NewReport
