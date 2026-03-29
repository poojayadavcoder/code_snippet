import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Register() {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {register} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      await register(name,email,password)
      navigate("/login")
    }
    catch(err){
      alert("Registration failed. Try again.");
    }
  }

  return (
   <div className='flex justify-center items-center min-h-screen bg-gray-100'>
     
     <div className='bg-white w-96 p-8 rounded-xl shadow-lg'>
       
       <h2 className='text-2xl font-bold text-center text-black mb-6'>
         Register
       </h2>

       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
         <label className='text-gray-700 font-medium'>Full Name</label>
         <input
           type="text"
           placeholder="Full Name"
           className='border border-gray-300 text-black p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
           value={name}
           onChange={(e)=>setName(e.target.value)}
         />
          <label className='text-gray-700 font-medium'>Email</label>
         <input
           type="email"
           placeholder="Email"
           className='border border-gray-300 text-black p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
         />
          <label className='text-gray-700 font-medium'>Password</label>
         <input
           type="password"
           placeholder="Password"
           className='border border-gray-300 text-black p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
         />

         <button
           type="submit"
           className='bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition'
         >
           Create Account
         </button>

       </form>

       <p className='text-sm text-center mt-4 text-gray-600'>
         Already have an account?
         <Link to={"/login"} className='text-blue-600 cursor-pointer ml-1'>
           Login
         </Link>
       </p>

     </div>

   </div>
  )
}

export default Register