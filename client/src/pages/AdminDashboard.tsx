import { useNavigate } from "react-router-dom"

function AdminDashboard() {

    const navigate = useNavigate()

    return (
        <div>
            <button onClick={()=>navigate('/admin-dashboard/reports')}>all reports</button>
            <button onClick={()=>navigate('/admin-dashboard/users')}>watch and create users</button>
        </div>
    )
}

export default AdminDashboard
