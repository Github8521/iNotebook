import React from 'react'
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

const Signup = (props) => {
  let navigate=useNavigate()
  const[credential,setCredential]=useState({name:"", email:"",password:"",cpassword:""})
    const handlesubmit=async(e)=>{
        e.preventDefault()
        const{name,email,password}=credential
        const response = await fetch(`http://localhost:4000/api/auth/createuser`, {
          
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
    
          body: JSON.stringify({name,email,password})
        });
        const json=await response.json()
        console.log(json);
        if(json.success){
          // save the auth token and redirect
          localStorage.setItem('token',json.authtoken)
          navigate('/')
          props.showAlert('Account created successfully ','success')


        }
        else{
          props.showAlert('invalid detail','danger')

        }
    }

    const handlechange=(e)=>{
      setCredential({...credential,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <h2 className='text-center'>Create an account  to continue iNotebook</h2>

    <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' onChange={handlechange} required aria-describedby="name"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' id="email" onChange={handlechange} required aria-describedby="email"/>
    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" minLength={5} onChange={handlechange} required name='password'/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Conform Password</label>
    <input type="password" className="form-control" id="cpassword" minLength={5} onChange={handlechange} required name='cpassword'/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
