import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import './App.css'
import { ContextProvider } from "./Provider/context"
import AgentDashboard from "./pages/AgentDashboard"
import NewReport from "./pages/NewReport"
import UploadCsv from "./pages/UploadCsv"
import AgentReports from "./pages/AgentReports"
import AdminDashboard from "./pages/AdminDashboard"
import AdminReports from "./pages/AdminReports"
import AdminUsers from "./pages/AdminUsers"

function App() {

  return (
    <>
      <BrowserRouter>
        <ContextProvider >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/agentDashboard" element={<AgentDashboard />} />
            <Route path="/agentDashboard/new-report-page" element={<NewReport />} />
            <Route path="/agentDashboard/csv-files" element={<UploadCsv />} />
            <Route path="/agentDashboard/agent-reports" element={<AgentReports />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-dashboard/reports" element={<AdminReports />} />
            <Route path="/admin-dashboard/users" element={<AdminUsers />} />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
