import React, { useEffect, useState } from "react"
import type { Report } from "../types/ReportType"

function AdminReports() {
  const [reports, setReports] = useState<Report[]>()
  const [category, setCategory] = useState<string | null>(null)
  const [urgency, setUrgency] = useState<string | null>(null)
  const [id, setUserid] = useState<string | null>(null)
  const token = localStorage.getItem("token")

  async function fetchReport() {
    console.log(category, urgency, id)
    const params = new URLSearchParams()
    if (category !== null) {
      params.append("category", category)
    }
    if (urgency !== null) {
      params.append("urgency", urgency)
    }
    if (id !== null) {
      params.append("id", id)
    }
    try {
      const res = await fetch(`http://localhost:3000/reports/report?${params}`, {
        method: "GET",
        headers: { token: String(token) }
      })
      if (!res.ok) {
        console.log(res)
      }
      else {
        const data = await res.json()
        setReports(data.reports)
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    fetchReport()
  }, [])
  
  return (
    <div>
        <select name="category" id=""
          onChange={(e) => setCategory(e.target.value)}>
          <option disabled selected hidden>choose category</option>
          <option value="intelligence">intelligence</option>
          <option value="logistics">logistics</option>
          <option value="alert">alert</option>
        </select>
        <select name="urgency" id=""
          onChange={(e) => setUrgency(e.target.value)}>
          <option disabled selected hidden>choose urgency</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <input type="number" placeholder="enter agent id"
          onChange={(e) => setUserid(e.target.value)} />
        <button onClick={fetchReport}>search</button>
      <table>
        <thead>
          <tr>
            <th>user id</th>
            <th>category</th>
            <th>urgency</th>
            <th>message</th>
            <th>image</th>
            <th>createdAt</th>
          </tr>
        </thead>
        <tbody>
          {reports?.map((item: Report) => {
            return (
              <tr key={item.id}>
                <td>{item.userid}</td>
                <td>{item.category}</td>
                <td>{item.urgency}</td>
                <td>{item.message}</td>
                <td><img src={`http://localhost:3000/${item.imagePath}`} alt="image" /></td>
                <td>{item.createdAt}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div >
  )
}
export default AdminReports
