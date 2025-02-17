import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import EditBudget from './EditBudget';
import toast from 'react-hot-toast';
import { deleteBudget } from '../../services/budget/budgetApi';
import { useDispatch, useSelector } from 'react-redux';
import { setBudget } from '../../slices/budgetSlice';


const BudgetCard = ({ data }) => {
    const [open, setOpen] = useState(false);
    const { budgetData } = useSelector(state => state.budget);
    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        let res = await deleteBudget(id);

        if (res?.data?.success) {
            let filterData = budgetData.filter(item => item._id !== id);
            dispatch(setBudget(filterData));
            toast.success(res.data.message);
        }
        else {
            toast.error(res?.message);
        }
    }
    return (
        <>
            {open &&
                <EditBudget onClose={() => setOpen(false)} data={data} />
            }
            <div className='relative w-full h-40 rounded-lg bg-gray-200 hover:shadow-xl lg:w-80 '>
                <Link to={`/budget/${data?._id}`} className='block h-full'>
                    <div className='py-3 px-3 h-full space-y-1'>
                        <div className='flex justify-between items-center py-6'>
                            <h1 className='text-lg font-semibold capitalize'>{data?.name}</h1>
                            <h1 className='text-lg font-semibold'>${data?.amount}</h1>
                        </div>
                        <div className='space-y-4'>
                            <div className='flex justify-between text-sm px-3'>
                                <p className='text-sm'>totalExpense:{data?.count}</p>
                                <p className='text-sm'>Remaining:${ data?.amount-data?.totalExpense}</p>
                            </div>

                            <progress
                                className="progress progress-success "
                                value={(data?.totalExpense)}
                                // value={(data?.count>0&&data?.amount-data?.totalExpense===0?data?.amount:data?.totalExpense)}
                                max={data?.amount}
                                >
                            </progress>
                        </div>
                    </div>
                </Link>
                <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-blue-500 cursor-pointer text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                        <CiEdit />
                    </button>

                    <button onClick={() => handleDelete(data._id)} className="bg-red-500 text-white px-2 cursor-pointer py-1 rounded hover:bg-red-600">
                        <MdDeleteOutline />
                    </button>
                </div>
            </div>
        </>

    )
}

export default BudgetCard;
