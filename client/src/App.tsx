import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import './App.css'
import Reports from "./pages/Reports"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
