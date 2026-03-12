import React, { useEffect, useState } from "react"
import type { UsersAdmin } from "../types/UserAdminType"

function AdminUsers() {
    const [users, setUsers] = useState<UsersAdmin[]>()
    const [agentCode, setAgentCode] = useState<string | null>(null)
    const [fullName, setFullName] = useState<string | null>(null)
    const [role, setRole] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [req, setReq] = useState<boolean>(true)




    const token = localStorage.getItem('token')


    async function fetchUsers() {
        const result = await fetch('http://localhost:3000/admin/users', {
            method: "GET",
            headers: { token: String(token) }
        })
        if (!result.ok) {
            console.log(result)
        }
        else {
            const data = await result.json()
            setUsers(data.users)

        }

    }

    async function addUser(e: React.SyntheticEvent) {
        e.preventDefault()
        const newUser = {
            agentCode: agentCode,
            fullName: fullName,
            role: role,
            password: password
        }
        try {

            const result = await fetch("http://localhost:3000/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: String(token) },
                body: JSON.stringify(newUser)
            })

            if (!result.ok) {
                console.log(result)
            }
            else {
                const data = await result.json()
                console.log(data)
                setReq(!req)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUsers()
        
    }, [req])

    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Agent Code</th>
                            <th>Full Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user: UsersAdmin) => {
                            return (
                                <tr key={user.id}>
                                    <th>{user.id}</th>
                                    <td>{user.agentCode}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.role}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <form onSubmit={addUser}>

                <div className="new-user">
                    <input type="text" placeholder="enter agent code" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setAgentCode(e.target.value)
                    }} />
                    <input type="text" placeholder="enter full name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFullName(e.target.value)
                    }} />
                    <input type="text" placeholder="enter role" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setRole(e.target.value)
                    }} />
                    <input type="text" placeholder="enter password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value)
                    }} />
                    <button type="submit">add new user</button>
                </div>
            </form>
        </div>
    )
}

export default AdminUsers
