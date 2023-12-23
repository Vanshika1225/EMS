import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'

const Login = () => {
    const history=useHistory();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleLogin=()=>{
        // Login logic and authentications
        history.push('/dashboard');
    }
return (
    <div>
        <h2>Login</h2>
        <form>
            <label>
                Username:<input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} />
            </label>
            <br/>
            <label>
Password:<input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}  />
            </label>
            <br/>
            <button type='button' onClick={handleLogin}>Login</button>
        </form>
    </div>
)
}

export default Login
