import React, {useState} from 'react'
import './CSS/Login.css'
export const Login = () => {
  const [state,setState] = useState("Login")
  const [formData, setFormData]= useState({
    username:"",
    email:"",
    password:""
  })


  const login=async ()=>{
    console.log("Login Function Executed",formData)
   
    let responseData
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-type':'application/json'
      },
      body:JSON.stringify(formData)
      
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/')
    }
    else{
      alert(responseData.errors)
    }
  }
  const signup = async()=>{
    console.log("Sign Up Function Executed",formData)
    let responseData
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-type':'application/json'
      },
      body:JSON.stringify(formData)
      
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/')
    }
    else{
      alert(responseData.errors)
    }
  }
  const changeHandler =(e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  return (
    <div className='login-signup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name'/>:<></>}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder='Your Email'/>
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder='Password'/>  
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"?<p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login</span></p>:<p className='loginsignup-login'>Create a Account <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>}
        {/* <p className='loginsignup-login'>Already have an account? <span>Login</span></p> */}
        
        <div className="loginsignup-agree">
          <input type='checkbox' name='' id=''/>
          <p>By Continuing, i agree to terms of use & privacy policy.</p>
        </div>
      </div>

       

    </div>
  )
}
