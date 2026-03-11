import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import './App.css'
import Reports from "./pages/Reports"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
