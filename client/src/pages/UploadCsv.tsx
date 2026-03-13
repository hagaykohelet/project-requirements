import { useState } from "react"

function UploadCsv() {
    const token = localStorage.getItem("token")
    const [csv, setCsv] = useState<File | string>("")
    async function postCsv() {
        const form = new FormData()
        form.append("file", csv)
        try {
            const res = await fetch("http://localhost:3000/reports/csv", {
                method: "POST",
                headers: { token: String(token) },
                body: form
            })
            const data = await res.json()
            console.log(data)
        }catch(err){
            console.log(err)
        }}

    return (
        <div>
            <input type="file" name="csvFile" className="csvFile" onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => { if (e.target.files !== null && e.target.files[0] !== null) { setCsv(e.target.files[0]) } }} />
            <button onClick={postCsv}>send csv</button>
        </div>
    )
}

export default UploadCsv
