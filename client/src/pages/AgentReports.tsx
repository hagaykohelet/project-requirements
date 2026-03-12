import { useEffect, useState } from "react"
import type { Report } from "../types/ReportType"

function AgentReports() {
  const token = localStorage.getItem("token")
  const [reports, setReports] = useState<Report[] | undefined>([])
  async function agentRepo() {
    const result = await fetch("http://localhost:3000/reports/report", {
      method: "GET",
      headers: { token: String(token) }
    })
    if (!result.ok) {
      console.log(result)
    }
    else {
      const data = await result.json()
      setReports(data.reports)
    }
  }

  useEffect(() => {
    agentRepo()
  }, [])


  return (
    <div>
      <table>
        <thead>
          <tr>
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
    </div>
  )
}

export default AgentReports
