import React, { useEffect, useState  } from "react"
import type { Report } from "../types/ReportType"
import GetDataFetch from "../hooks/GetDataFetch"

function AgentReports(){
  const token = localStorage.getItem("token")
  // const [reports, setReports] = useState<Report[] | undefined>([])
  // async function agentRepo() {
  //   const result = await fetch("http://localhost:3000/reports/report", {
  //     method: "GET",
  //     headers: { token: String(token) }
  //   })
  //   if (!result.ok) {
  //     console.log(result)
  //   }
  //   else {
  //     const data = await result.json()
  //     setReports(data.reports)
  //   }
  // }
  const { error, fetchData, result } = GetDataFetch("http://localhost:3000/reports/report", String(token))


  useEffect(() => {
    // agentRepo()
    fetchData()
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
          {result?.map((item: Report) => {
            console.log(item)
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
