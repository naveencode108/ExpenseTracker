import React from 'react'
import { GrAdd } from "react-icons/gr";
import BudgetCard from '../common/BudgetCard';


const Budget = () => {
  return (
    <div className='flex-1 bg-gray-100 h-full px-2 py-3'>
      <div className='flex flex-wrap rounded-lg gap-3 max-h-full py-5 bg-white px-3 overflow-y-auto'>
        <button className='w-80 hover:shadow-xl cursor-pointer h-40 bg-sky-200 backdrop-blur-md rounded-lg flex items-center justify-center'>
          <GrAdd size={40} />
        </button>
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
      </div>
    </div>
  )
}

export default Budget