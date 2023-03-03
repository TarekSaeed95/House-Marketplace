import { useState } from 'react'
import { FaEye, FaLock, FaMailBulk, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {doc,setDoc,serverTimestamp} from 'firebase/firestore'
import { db } from '../../firebass.config'
import { toast } from 'react-toastify'
function SignUp() {
  const navigate=useNavigate()
  const [showPassword, setShowPassword]=useState(false)

  const [formData,setFormData]=useState({})
  const {name,email,password}=formData
 function onChange(e){
  setFormData((prev)=>({...prev,[e.target.id]:e.target.value}))
 }

 async function onSubmit(e){
  e.preventDefault();
  const auth=getAuth();
  const formDataCopy={...formData}
  delete formDataCopy.password
  formDataCopy.timeStamp=serverTimestamp()
  try {
    const userCredential=await createUserWithEmailAndPassword(auth,email,password)
    const user=userCredential.user;
    updateProfile(auth.currentUser,{
      displayName:name
    })
    const userRef=doc(db,'users',user.uid)
    await setDoc(userRef,formDataCopy)
    toast.success(`Congratulation ${auth.currentUser.displayName}`)
    setTimeout(() => {
      navigate("/signin")
    }, 1000);
  } catch (error) {
    toast.error("Email is invalid or already taken")
  }
 }
  return (
    <div className='sign-in p-6 min-h-screen'>
      <h2 className='text-center text-violet-700 head-title	mb-20	'>Welcome to House Marketplace</h2>
      <div className="container">
      <form onSubmit={onSubmit}>
    <div className="my-8 flex items-center">
        <FaUser className='icon text-warning'/>
      <input type="text"
        placeholder='Your name'
        className="form-control rounded-full placeholder:text-slate-400 border-0 px-16 py-3"
        id="name"
        onChange={onChange}
        aria-describedby="emailHelp"/>
    </div>
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
    <div className="buttons flex gap-3 flex-col items-center ">
    <button className="btn btn-secondary 	px-32 ">Sign up</button>
    <Link className="btn btn-ghost hover:bg-black hover:text-white self-end" to="/signin">Already have an account?</Link>
    </div>
  </form>
      </div>
    </div>
  )
}

export default SignUp