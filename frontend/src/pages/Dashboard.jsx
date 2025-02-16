import React from 'react'
import Navbar from '../components/layouts/Navbar';
import Sidebar from '../components/layouts/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='w-full h-[calc(100vh-60px)] text-black'>
      <Navbar />
      <div className='w-full h-full flex gap-1'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard