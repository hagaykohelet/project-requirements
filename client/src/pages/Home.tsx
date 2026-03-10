import '../style/Home.css'

function Home() {
    return (
        <div className="home-page">
            <h1>Welcome to report system</h1>

            <div className="agentCode-password">
                <label htmlFor="agent-code">please enter your agent code:
                    <input type="text" id="agent-code" placeholder="a-101" />
                </label>
                <label htmlFor="password">please enter your password:
                    <input type="text" id="password" placeholder="******"/>
                </label>
            </div>
            <button className='btn-sub'>submit</button>
        </div>
    )
}

export default Home
