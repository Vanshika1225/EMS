import React from 'react'

const Signup = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [role,setRole] = useState('');
    
    const handleSignup=()=>{
        if(username===''|| password==="" || role ==="") return;
        fetch('/api/signup',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                username,
                password,
                role
                })
                }).then((res)=>res.json())
                .catch((err)=>{console.log(err)})
                .then(()=>{window.location.replace("/login");});
            
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
            <label>
Role:<input type='checkbox' value={admin} onChange={(e)=>{setRole(e.target.value)}}  />
            </label>
            <br/>
            <button type='submit' onClick={handleSignup}>Login</button>
        </form>
    </div>
)}

export default Signup
