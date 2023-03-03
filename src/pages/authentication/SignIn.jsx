import { useState } from 'react'
import { FaEye, FaLock, FaMailBulk} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import GoogleOAuth from '../../component/GoogleOAuthComponent'
import { toast } from 'react-toastify'
function SignIn() {
  const [showPassword, setShowPassword]=useState(false)
  const [formData,setFormData]=useState({})
  const {email,password}=formData
  const navigate=useNavigate()
  function onChange(e){
    setFormData((prev)=>({...prev,[e.target.id]:e.target.value}))
   }  
   async function onSubmit (e){
    e.preventDefault();
    const auth=getAuth();
   try {
    const userCredential=await signInWithEmailAndPassword(auth,email,password)
    if(userCredential.user){
      toast.success(`Welcome back ${auth.currentUser.displayName}`)
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }
   } catch (error) {
    toast.error('Incorrect Email or password.')
   } 
   }
  return (
    <div className='sign-in p-6 h-screen'>
      <h2 className='text-center text-violet-700 head-title	mb-20	'>Welcome to House Marketplace</h2>
      <GoogleOAuth/>
      <div className="container">
      <form onSubmit={onSubmit}>
    <div className="my-8 flex items-center">
        <FaMailBulk className='icon text-warning'/>
        <input
      type="email"
      placeholder='Email'
      className="form-control rounded-full placeholder:text-slate-400 border-0 px-16 py-3"
      id="email"
      onChange={onChange}
      aria-describedby="emailHelp"/>
      </div>
    <div className="my-8  flex items-center relative">
        <FaLock className='icon text-warning'/>
        <input
      type={showPassword?'text':'password'}
      placeholder='Password'
      className="form-control rounded-full placeholder:text-slate-400 border-0 px-16 py-3"
      onChange={onChange}
      id="password"/>
        <FaEye className='eye text-warning' style={{cursor:'pointer'}} onClick={()=>setShowPassword(prev=>!prev)}/>
    </div>
    <div className="buttons flex gap-3 justify-end">
    <Link className="text-sky-400 self-center font-bold mr-auto ml-8" to="/forgotpassword">Forgot password?</Link>
    <button className="btn btn-primary">Sign in</button>
    <Link className="btn btn-secondary" to="/signup">Sign up</Link>
    </div>
    
  </form>
      </div>
    </div>
  )
}

export default SignIn