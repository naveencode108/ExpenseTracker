import React from 'react'
import { Link } from 'react-router-dom'

const BudgetCard = () => {

    return (
        <Link className='w-80 h-40 rounded-lg bg-gray-200 hover:shadow-xl '>
            <div className='py-3 px-3 h-full'>
                <div className='flex justify-between items-center py-4'>
                    <div className='size-16 rounded-full bg-red-400'>
                        <img src="" alt="" />
                    </div>
                    <h1>Price</h1>
                </div>
                <div className='border'>asdf</div>
            </div>
        </Link>
    )
}

export default BudgetCard