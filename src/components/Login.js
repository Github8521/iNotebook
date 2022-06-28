import React from 'react'
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

const Login = (props) => {
  let navigate=useNavigate()
  const[credential,setCredential]=useState({email:"",password:""})
    const handlesubmit=async(e)=>{
        e.preventDefault()
        const response = await fetch(`http://localhost:4000/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
    
          body: JSON.stringify({email:credential.email,password:credential.password})
        });
        const json=await response.json()
        console.log(json);
        if(json.success){
          // save the auth token and redirect
          localStorage.setItem('token',json.authtoken)
          props.showAlert('loggedin successfully ','success')
          navigate('/')

        }
        else{
        props.showAlert('invalid credential','danger')
        }
    }

    const handlechange=(e)=>{
      setCredential({...credential,[e.target.name]:e.target.value})
    }
    
  return (
    <div>
      <h2 className='text-center'>Login to continue iNotebook</h2>
      <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={credential.email} onChange={handlechange} aria-describedby="email"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credential.password}  onChange={handlechange} name='password' id="password"/>
  </div>
 
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
