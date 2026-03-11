import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import './App.css'
import { ContextProvider } from "./Provider/context"
import AgentDashboard from "./pages/AgentDashboard"
import NewReport from "./pages/NewReport"
import UploadCsv from "./pages/UploadCsv"

function App() {

  return (
    <>
      <BrowserRouter>
        <ContextProvider >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/agentDashboard" element={<AgentDashboard />} />
            <Route path="/new-report-page" element={<NewReport />} />
            <Route path="/csv-files" element={<UploadCsv />} />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
