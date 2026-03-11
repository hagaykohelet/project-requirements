import React, { useState } from 'react'
import '../style/Home.css'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [success, setSuccess] = useState<boolean>(true)
    const [password, setPassword] = useState<string>()
    const [agentCode, setAgentCode] = useState<string>()
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
            navigate('/reports')
        }
    }

    return (
        <div className="home-page">
            <h1>Welcome to report system</h1>

            <div className="agentCode-password">
                <label htmlFor="agent-code">please enter your agent code:
                    <input type="text" id="agent-code" placeholder="a-101" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAgentCode(e.target.value) }} />
                </label>
                <label htmlFor="password">please enter your password:
                    <input type="text" id="password" placeholder="******" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }} />
                </label>
            </div>
            <button className='btn-sub' onClick={login}>login</button>
            {!success && <p>access denied</p>}
        </div>
    )
}

export default Login
