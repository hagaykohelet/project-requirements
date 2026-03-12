import React, { useContext, useState } from 'react'
import '../style/Login.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Provider/context'


function Login() {
    const [success, setSuccess] = useState<boolean>(true)
    const [password, setPassword] = useState<string>()
    const [agentCode, setAgentCode] = useState<string>()
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    async function login() {
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: password, agentCode: agentCode })
        }
        )
        if (!res.ok) {
            setSuccess(false)
        }
        else {
            const data = await res.json()
            localStorage.setItem("token", data.token)
            setUser({
                id: data.user.id, agentCode: data.user.agentCode,
                fullName: data.user.fullName,
                role: data.user.role
            })
            console.log(data)
            if (data.user.role === "agent") {
                navigate('/agentDashboard')
            }
            else {
                navigate('/admin-dashboard')
            }
        }
    }


    return (
        <div className="home-page">
            <header>
                <h1>Welcome to report system</h1>
            </header>

            <main className="agentCode-password">
                <input type="text" id="agent-code" placeholder="enter your agent code" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAgentCode(e.target.value) }} />
                <input type="password" id="password" placeholder="enter your password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }} />
            </main>
            <button className='btn-sub' onClick={login}>login</button>
            {!success && <p>access denied</p>}
        </div>
    )
}

export default Login
