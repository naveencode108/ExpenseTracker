import React from 'react'
import { Link } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { TbMoneybag } from "react-icons/tb";
import { GrMoney } from "react-icons/gr";





const Sidebar = () => {

  const sideData = [
    { title: 'Dashboard', path: '/', icon: <RxDashboard /> },
    { title: 'Budget', path: '/budget', icon: <GrMoney /> },
    { title: 'Expense', path: '/expense', icon: <TbMoneybag /> },
  ]

  return (
    <div className='w-50 transition-all ease-linear md:w-60 h-full bg-gray-200 text-black px-4 py-5'>
      <div>
        {sideData.map((item, index) => (
          <Link className='text-lg cursor mb-4 hover:bg-gradient-to-l transition-all ease-in-out bg-gradient-to-r from-orange-200 to-violet-300 rounded-lg py-3 px-3 flex items-center' to={item.path} key={index}>
            <div className='text-gray-700'>
              {item.icon}
            </div>
            <p className='text-md text-gray-700'>
            {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar