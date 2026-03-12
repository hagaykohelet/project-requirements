import { useContext } from "react"
import { UserContext } from "../Provider/context"
import { useNavigate } from "react-router-dom"

function AgentDashboard() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  return (
    <div className="report-page">
      <header><h1>welcome {user.fullName}</h1></header>
      <main>
        <button onClick={()=>{navigate('/agentDashboard/new-report-page')}} className="send-new-btn">send a new report</button>
        <button onClick={()=>{navigate("/agentDashboard/csv-files")}} className="csv-btn">upload csv</button>
        <button onClick={()=>{navigate('/agentDashboard/agent-reports')}} className="watch-rep">watch your reports</button>
      </main>
    </div>
  )
}

export default AgentDashboard
