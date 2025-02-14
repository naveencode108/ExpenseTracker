import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate=useNavigate();

  const handleLogout=()=>{
       localStorage.removeItem('token');
       localStorage.removeItem('user');
       navigate('/login');
       toast.success("Logged out");
  }

  return (
    <div className='w-full bg-gray-100 py-3 flex justify-between items-center px-7 '>
      <h1 className='text-3xl'>ExpensER</h1>
      <button onClick={handleLogout} className='px-3 py-1 rounded-lg bg-sky-500 text-white cursor-pointer'>Logout</button>
    </div> 
  )
}

export default Navbar